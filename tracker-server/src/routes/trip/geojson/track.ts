import { Context } from 'hono'
import { getTrip } from '../../../migrate/migrations/existing-trips/trip'
import { AllTrips } from '../../../migrate/migrations/existing-trips/types'
import { Bindings } from '../../../bindings'

export const GetTripGeoJSONTrack = async (c: Context<{ Bindings: Bindings }>) => {
	const { trip } = c.req.param()

	const tripDetails = getTrip(trip as AllTrips)

	if (!tripDetails) {
		return c.json({ message: 'Trip not found!' }, 404)
	}

	const jsonString = await c.env.GEOJSON.get(`${tripDetails.id}-track`)

	if (!jsonString) {
		return c.json({ message: 'Trip GeoJSON not found!' }, 404)
	}

	const parsedJson = JSON.parse(jsonString)

	if (parsedJson.features.length === 0) {
		return c.json({ message: 'Trip GeoJSON empty!' }, 404)
	}

	return c.json(parsedJson, 200)
}
