'use client'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'

const Error = () => {
	return (
		<Box width="100vw" justify="center" style={{ paddingTop: '18%', display: 'flex' }}>
			<Stack gap={10} alignItems="center">
				<BrandLogo />
				<Box
					backgroundColor="neutral.50"
					boxShadow="medium"
					padding={10}
					borderRadius="small"
					style={{ width: '500px' }}>
					<Stack gap={8} alignItems="center">
						<Stack gap={3}>
							<Heading variant="h3" textTransform="uppercase" textAlign="center" whiteSpace="nowrap">
								Something went wrong
							</Heading>
							<Text fontSize="small" textAlign="center">
								Please wait a moment and then reload. If reload doesn't help, request assistance.
							</Text>
						</Stack>
						<Button className={atoms({ width: '100%' })} onClick={() => window.location.reload()}>
							Reload
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}

export default Error
