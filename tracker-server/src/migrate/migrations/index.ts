import { MIGRATION_0_INITIAL } from './0-initial'
import { Migration } from '../types'
import { MIGRATION_1_EXISTING_TRIPS } from './1-existing-trips'
import { MIGRATION_2_WAYPOINTS } from './2-waypoints'

export function getAllMigrations(): Migration[] {
	return [MIGRATION_0_INITIAL, MIGRATION_1_EXISTING_TRIPS, MIGRATION_2_WAYPOINTS]
}