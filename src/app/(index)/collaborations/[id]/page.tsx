import { getCollaboration } from 'api/services/collaborations'
import { CollaborationDetails } from './CollaborationDetails'
import { formatDate } from '@/utils/formatDate'

interface Props {
	params: { id: string }
}

const CollaborationDetailsPage = async ({ params }: Props) => {
	const { data } = await getCollaboration(params.id)
	const transformedData = {
		...data?.collaboration,
		createdAt: formatDate(data?.collaboration?.createdAt),
		inDeadline: data?.collaboration?.inDeadline ? 'Yes' : 'No'
	}

	return <CollaborationDetails collaboration={transformedData} />
}

export default CollaborationDetailsPage
