import { getCollaboration } from 'api/services/collaborations'
import { CollaborationDetails } from './CollaborationDetails'

interface Props {
	params: { id: string }
}

const CollaborationDetailsPage = async ({ params }: Props) => {
	const { data } = await getCollaboration(params.id)

	return <CollaborationDetails collaboration={data.collaboration} />
}

export default CollaborationDetailsPage
