import { getCollaboration } from 'api/services/collaborations'
import CollaborationEdit from './CollaborationEdit'

interface Props {
	params: { id: string }
}

const CollaborationsEditPage = async ({ params }: Props) => {
	const { data } = await getCollaboration(params.id)

	if (!data?.collaboration?.cancellation) {
		// todo redirect
		return 'No cancellation data'
	}

	return <CollaborationEdit collaboration={data.collaboration} />
}

export default CollaborationsEditPage
