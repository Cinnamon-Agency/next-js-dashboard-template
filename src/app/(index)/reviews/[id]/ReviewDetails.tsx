'use client'

import { EditButton } from '@/components/custom/button/edit-button'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Review } from 'api/models/reviews/reviews'
import { ROUTES } from 'parameters'

interface Props {
	review: Review
}

import Details from '../Details'
export const ReviewDetails = ({ review }: Props) => {
	useNavbarItems({
		title: `Review ${review.id}`,
		backLabel: 'Reviews.back',
		actionButton: <EditButton buttonLabel="Reviews.edit" buttonLink={ROUTES.EDIT_REVIEW + review.id} />
	})

	return <Details review={review} />
}
