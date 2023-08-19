import { Context, Next } from 'hono'
import { Bindings } from '../bindings'
import { getSecureEndpoints, HTTPMethods } from './secure-endpoints'
import { AuthException } from './common'
import { AdminAuth } from './admin'

export const checkPath = (path: string, method: string, endpoints = getSecureEndpoints()) => {
	for (const secureEndpoint of endpoints) {
		if (path.match(secureEndpoint.path) && secureEndpoint.methods.includes(method as HTTPMethods)) {
			console.info(`${method} ${path} matched against ${secureEndpoint.path} / ${secureEndpoint.methods}`)
			return secureEndpoint
		}
	}
}

export const AuthMiddleware = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
	const match = checkPath(c.req.path, c.req.method)

	if (match) {
		let result = false

		if (match.authTypes.includes('admin') && !result) {
			result = await AdminAuth(c)
		}

		if (!result) {
			console.error('No auth was successful!')
			throw new AuthException('Unauthorized', 401)
		}
	}

	console.log('Auth successful!')
	await next()
}
