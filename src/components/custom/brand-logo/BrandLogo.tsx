import Image from 'next/image'

type BrandLogoProps = { addHomeLink?: boolean }

export const BrandLogo = ({ addHomeLink }: BrandLogoProps) => {
	// replace with your logo
	const image = <Image src="/images/no-data-found.svg" width={135} height={33} alt="logo" />

	if (addHomeLink) {
		return <a href="/">{image}</a>
	}

	return image
}
