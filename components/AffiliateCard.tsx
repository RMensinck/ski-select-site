import Card from '@/components/Card'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface AffiliateCardProps {
    productName: string
    description: string
    affiliateUrl: string
    imageUrl?: string
    ctaText?: string
    disclaimer?: string
    badgeText?: string
    onClick?: () => void
}

export default function AffiliateCard({
    productName,
    description,
    affiliateUrl,
    imageUrl,
    ctaText = "Check it out",
    disclaimer = "This is an affiliate link. We may earn a commission at no extra cost to you.",
    badgeText = "Recommended Product",
    onClick
}: AffiliateCardProps) {
    return (
        <Card className="my-2 overflow-hidden border-2 border-accent-color/20 bg-gradient-to-br from-bg to-accent-color/5 md:my-8">
            <div className="p-2 md:p-6">
                {/* Header */}
                <div className="mb-3 flex items-center gap-2 md:mb-4">
                    <span className="rounded-full bg-accent-color/10 px-2.5 py-0.5 text-xs font-semibold text-accent-color md:px-3 md:py-1">
                        {badgeText}
                    </span>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    {/* Image (optional) */}
                    {imageUrl && (
                        <div className="flex-shrink-0">
                            <img
                                src={imageUrl}
                                alt={productName}
                                className="h-44 w-44 rounded-lg object-cover md:h-64 md:w-64"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="mb-2 text-lg font-bold text-text md:text-xl">
                            {productName}
                        </h3>
                        <p className="mb-3 text-sm leading-relaxed text-text-muted md:mb-4 md:text-base">
                            {description}
                        </p>

                        {/* CTA Button */}
                        <a
                            href={affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            onClick={onClick}
                            className="inline-flex items-center gap-2 rounded-lg bg-accent-color px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-color/90 hover:shadow-lg md:px-6 md:py-3 md:text-base"
                        >
                            {ctaText}
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 md:h-5 md:w-5" />
                        </a>
                    </div>
                </div>

                {/* Disclaimer */}
                {disclaimer && (
                    <p className="mt-3 border-t border-text-muted/10 pt-3 text-xs text-text-muted/70 md:mt-4 md:pt-4">
                        {disclaimer}
                    </p>
                )}
            </div>
        </Card>
    )
}
