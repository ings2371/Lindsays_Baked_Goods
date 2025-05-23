import { NextResponse } from 'next/server'

const excludedPaths = ["/", "/baked-goods", "/contact", "/checkout"]
const excludePathsInclude = ["/api", "/_next", "/favicon", "/logo"]

const getIp = (request) => {
  return (
    request.headers.get("x-forwarded-for")?.split(',')[0] ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("forwarded")?.match(/for=([^;]*)/)?.[1] ||
    request.ip || 
    "IP Not Available"
  )
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip logging if the path is excluded
  let unknownPath = true
  for (const path of excludedPaths) {
    if (pathname == path) {
      unknownPath = false
      break
    }
  }
  for (const path of excludePathsInclude) {
    if (pathname.startsWith(path)) {
      unknownPath = false
      break
    }
  }

  if (unknownPath) {
    const ip = getIp(request)
    console.log(`IP ${ip} tried to access ${pathname}`)
  }

  return NextResponse.next()
}

// Match everything (we'll filter inside)
export const config = {
  matcher: "/:path*"
}
