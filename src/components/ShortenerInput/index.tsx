import axios from 'axios'
import { useState } from 'react'
import { z } from 'zod'
import { ShortenedURL } from '../ShortenedUrl'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const urlSchema = z
    .string()
    .transform((url) => (url.startsWith('https://') ? url : `https://${url}`))
    .refine((url) => /\.[a-zA-Z]/.test(url), {
        message: "URL must contain at least one '.' followed by a letter",
    })

export const ShortenerInput = () => {
    const [error, setError] = useState<string | null>(null)
    const [shortenedURLs, setShortenedURLs] = useState<
        { id: string; shortenedUrl: string }[]
    >([])

    const fetchShortenedUrl = async (url: string) => {
        const response = await axios.post('http://localhost:3001/shorten', {
            originalUrl: url,
        })
        return {
            id: response.data.id,
            shortenedUrl: response.data.shortenedUrl,
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const urlElement = e.currentTarget.elements.namedItem(
            'url'
        ) as HTMLInputElement
        const inputValue = urlElement.value

        try {
            const validatedUrl = urlSchema.parse(inputValue)
            const { id, shortenedUrl } = await fetchShortenedUrl(validatedUrl)
            setShortenedURLs([{ id, shortenedUrl }])
            urlElement.value = ''
            setError(null)
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors)
                setError(error.errors[0].message)
            }
        }
    }

    const removeUrl = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/shorten/${id}`)
            setShortenedURLs((prevURLs) =>
                prevURLs.filter((url) => url.id !== id)
            )
        } catch (error) {
            console.error('Failed to delete the URL:', error)
        }
    }

    return (
        <div>
            <form className="flex justify-center mt-32" onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="url">Original URL</Label>
                    <Input
                        type="text"
                        id="url"
                        placeholder="Original URL"
                        required
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <Button type="submit" className="mt-3">
                        Make short
                    </Button>
                </div>
            </form>
            {shortenedURLs.map(({ id, shortenedUrl }) => (
                <ShortenedURL
                    key={id}
                    url={shortenedUrl}
                    onRemove={() => removeUrl(id)}
                />
            ))}
        </div>
    )
}
