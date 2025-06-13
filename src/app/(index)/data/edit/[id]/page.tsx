import { getDataById } from 'api/services/data'
import DataEdit from './DataEdit'

interface Props {
	params: { id: string }
}

const DataEditPage = async ({ params }: Props) => {
	const { data } = await getDataById(params.id)

	return <DataEdit data={data.data} />
}

export default DataEditPage
