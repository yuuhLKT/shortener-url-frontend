import { ModeToggle } from '../mode-toggle'

export const Header = () => {
    return (
        <>
            <div className="w-full h-16 bg-zinc-600 py-3">
                <div className="flex justify-between items-center px-6">
                    <div className="flex-grow text-center text-white">
                        <h1 className="text-xl">Shortener this URL</h1>
                    </div>
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </>
    )
}
