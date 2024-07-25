import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { ArrowUpRight, ClipboardCopy, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface ShortenedURLProps {
    url: string
    onRemove: () => void
}

export const ShortenedURL = ({ url, onRemove }: ShortenedURLProps) => {
    const { toast } = useToast()

    const goToSite = () => {
        window.open(url, '_blank')
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        toast({
            title: 'Copied to clipboard',
            description: 'Click "Go" to visit the site.',
            action: (
                <ToastAction altText="Go to site" onClick={goToSite}>
                    Go
                </ToastAction>
            ),
        })
    }

    return (
        <div className="flex justify-center mt-8">
            <Card className="w-80 relative">
                <CardHeader>
                    <CardTitle>Shortened URL</CardTitle>
                    <X
                        size={20}
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={onRemove}
                    />
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center bg-zinc-500 p-2 rounded-md">
                        <a
                            className="ml-2 text-white text-sm cursor-pointer truncate w-48"
                            onClick={goToSite}
                        >
                            {url}
                        </a>
                        <ArrowUpRight
                            size={20}
                            className="text-white ml-1 cursor-pointer"
                            onClick={goToSite}
                        />
                        <ClipboardCopy
                            size={20}
                            className="text-white cursor-pointer"
                            onClick={handleCopy}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
