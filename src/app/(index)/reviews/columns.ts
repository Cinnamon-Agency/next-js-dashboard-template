import type { ColumnDef } from '@tanstack/react-table'
import { Review } from 'api/models/reviews/reviews'

export const columns: Array<ColumnDef<Review>> = [
	{ accessorKey: 'reviewerName', header: 'Reviews.reviewerName' },
	{ accessorKey: 'comment', header: 'Reviews.comment' },
	{ accessorKey: 'communication', header: 'Reviews.communication' },
	{ accessorKey: 'expertise', header: 'Reviews.expertise' },
	{ accessorKey: 'reliability', header: 'Reviews.reliability' },
	{ accessorKey: 'time', header: 'Reviews.time' },
	{ accessorKey: 'status', header: 'Reviews.status' }
]
