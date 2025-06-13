import { formatDate } from '@/utils/formatDate'
import { getDataById } from 'api/services/data'
import { DataDetails } from './DataDetails'

interface Props {
	params: { id: string }
}

const DataDetailsPage = async ({ params }: Props) => {
	const { data } = await getDataById(params.id)
	const transformedData = {
		...data?.data,
		createdAt: formatDate(data?.data?.createdAt)
	}

	return <DataDetails data={transformedData} />
}

export default DataDetailsPage
