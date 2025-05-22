import { CollaborationCancellationStatus, CollaborationStatus } from 'api/models/collaborations/collaborations'
import { ReviewStatus } from 'api/models/reviews/reviews'
import { Role } from 'api/models/roles/roles'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface OptionParams {
	omitDefaultLabel?: boolean
}

export const handleRoleOptions = (roles: Role[], params?: OptionParams) => {
	const transformedArray = roles
		.filter(({ name }) => ![UserRoleEnum.USER, UserRoleEnum.SUPER_ADMIN].includes(name))
		.map(({ id, permissions, name }) => ({ value: id, label: `${name} - ${permissions.toString()}` }))
	return params?.omitDefaultLabel ? transformedArray : [{ value: '', label: 'Select role' }, ...transformedArray]
}

export const handleReviewStatusOptions = (params?: OptionParams) => {
	const transformedStatusArray = Object.keys(ReviewStatus).map(key => ({
		value: key,
		label: key
	}))
	return params?.omitDefaultLabel
		? transformedStatusArray
		: [{ value: '', label: 'All review statuses' }, ...transformedStatusArray]
}

export const handleReviewRatingOptions = () => {
	const transformedRatingArray = Array.from({ length: 5 }, (_, i) => ({
		value: (i + 1).toString(),
		label: `Avg rating ${(i + 1).toString()}`
	}))
	return [{ value: '', label: 'All avg ratings' }, ...transformedRatingArray]
}

export const handleCollaborationStatusOptions = () => {
	const transformedStatusArray = Object.keys(CollaborationStatus).map(key => ({
		value: key,
		label: key
	}))
	return [{ value: '', label: 'All collaboration statuses' }, ...transformedStatusArray]
}

export const handleCancellationStatusOptions = (params?: OptionParams) => {
	const transformedStatusArray = Object.keys(CollaborationCancellationStatus).map(key => ({
		value: key,
		label: key
	}))
	return params?.omitDefaultLabel
		? transformedStatusArray
		: [{ value: '', label: 'All cancellation statuses' }, ...transformedStatusArray]
}
