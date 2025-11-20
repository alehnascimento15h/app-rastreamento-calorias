import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/']
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

  // Se não está autenticado e tenta acessar rota protegida
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Se está autenticado e tenta acessar a página de login
  if (session && req.nextUrl.pathname === '/') {
    // Verificar se completou onboarding
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', session.user.id)
      .single()

    if (profile) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard', '/onboarding'],
}
