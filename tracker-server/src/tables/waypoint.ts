import { WaypointTable, getKyselyDb } from './db'

export async function dropWaypointTable(db: D1Database) {
	const dropTableResult = await db.exec(`DROP TABLE IF EXISTS waypoint`)

	return dropTableResult
}

export async function listWaypoints(db: D1Database) {
	return await getKyselyDb(db).selectFrom('waypoint').selectAll().execute()
}

export async function findWaypointsForTrip(db: D1Database, tripId: string) {
	return await getKyselyDb(db)
		.selectFrom('waypoint')
		.selectAll()
		.where('trip_id', '=', tripId)
		.executeTakeFirst()
}

export async function insertWaypoint(db: D1Database, waypoint: WaypointTable) {
	return await getKyselyDb(db).insertInto('waypoint').values(waypoint).execute()
}

export async function updateTrip(db: D1Database, tripId: string, waypoint: Partial<Omit<WaypointTable, 'trip_id'>>) {
	return await getKyselyDb(db).updateTable('waypoint').set(waypoint).where('trip_id', '=', tripId).execute()
}

export async function deleteTrip(db: D1Database, tripId: string, waypointName: string) {
	return await getKyselyDb(db).deleteFrom('waypoint').where(({ and, cmpr }) => and([cmpr('trip_id', '=', tripId), cmpr('name', '>', waypointName)])).execute()
}
