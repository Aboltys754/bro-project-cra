
type ISlide = {
    key: number
    createdAt: string,
    files: IStaticFile[] | [],
    id: string,
    isPublic: boolean,
    message: string,
    title: string,
    updatedAt: string,
}

export default function Slide(slide: ISlide) {
    return (
        <div>
            1
        </div>
    )
}