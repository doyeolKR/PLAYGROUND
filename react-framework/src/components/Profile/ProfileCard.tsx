interface ClassNameProps {
    className: string;
    imageSrc: string;
    imageSize: string;
    onClick?: any;
    name: string;
    nickname: string;
    rating?: string;
}

export default function ProfileCard({ className, imageSrc, imageSize, name, nickname, rating, onClick }: ClassNameProps) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <img src={imageSrc} className={imageSize + " self-center"} />
            <div className="flex flex-col ml-25 my-15 h-35 justify-center w-full place-self-start">
                <h1 className="text-16 font-bold mb-5">{name}</h1>
                <h2 className="text-15 text-[#858e94]">{nickname}</h2>
            </div>
            <div className="bg-[#cb7537] w-auto h-18 rounded-10 text-11 mr-20">
                <p className="mt-1 mx-5 text-11 text-white  text-center tracking-tight">{rating}</p>
            </div>
        </div>
    )
}