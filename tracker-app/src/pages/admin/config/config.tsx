import { faCheck, faCog } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListConfig200Response } from 'tracker-server-client'
import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { useLoaderData } from 'react-router-dom'
import { createConfigApi } from '../../../api'
import Action from '../../../components/action/action'
import Button from '../../../components/button/button'
import Header from '../../../components/header/header'
import { useNotificationAwareRequest } from '../../../hooks/notification'
import useReload from '../../../hooks/reload'
import './config.css'
import { DateTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import Toggle from '../../../components/toggle/toggle'

export default function AdminConfig() {
	const { configs } = useLoaderData() as ListConfig200Response
	useReload(configs)
	const request = useNotificationAwareRequest()
	const auth = useAuth()

	const [changedValues, setChangedValues] = useState<{ [key: string]: string }>({})

	const api = createConfigApi(auth.user?.access_token || '')

	const updateValues = async () => {
		if (Object.keys(changedValues).length === 0) return

		await request(
			async () => {
				for (const key in changedValues) {
					await api.updateConfig(key, { value: changedValues[key] })
				}
			},
			{
				message: 'Successfully updated config values',
			}
		)
	}

	return (
		<div className="config">
			<Header
				title={'Config'}
				color="red"
				className="corner-right"
				leftActions={<FontAwesomeIcon icon={faCog} size="lg" />}
				rightActions={<Button color="green" onClick={async () => await updateValues()} iconProps={{ icon: faCheck }} />}
			/>
			{configs?.map((config) => (
				<Action key={config.id} text={config.name} description={config.description}>
					{config.editable ? (
						<div className="input-wrapper">
							{config.format === 'text' || config.format === 'number' ? (
								<input
									type="text"
									value={changedValues[config.id] || config.value}
									onChange={(e) =>
										setChangedValues({
											...changedValues,
											[config.id]: e.currentTarget.value,
										})
									}
								/>
							) : undefined}
							{config.format === 'datetime' ? (
								<DateTimePicker
									className="date-picker"
									value={moment(changedValues[config.id] || config.value)}
									onChange={(v) =>
										v &&
										setChangedValues({
											...changedValues,
											[config.id]: v.toISOString(),
										})
									}
								/>
							) : undefined}
							{config.format === 'boolean' ? (
								<Toggle
									color="red"
									checked={config.value === 'true'}
									onChange={(e) =>
										setChangedValues({
											...changedValues,
											[config.id]: config.value === 'true' ? 'false' : 'true',
										})
									}
								/>
							) : undefined}
						</div>
					) : (
						<>
							{config.format === 'text' || config.format === 'number' || config.format === 'boolean' ? config.value : undefined}
							{config.format === 'datetime' ? moment(config.value).calendar() : undefined}
						</>
					)}
				</Action>
			))}
		</div>
	)
}