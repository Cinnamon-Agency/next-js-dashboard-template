import { getCollaboration } from 'api/services/collaborations'
import CollaborationEdit from './CollaborationEdit'

interface Props {
	params: { id: string }
}

const CollaborationsEditPage = async ({ params }: Props) => {
	const { data } = await getCollaboration(params.id)

	return <CollaborationEdit collaboration={data.collaboration} />
}

export default CollaborationsEditPage
