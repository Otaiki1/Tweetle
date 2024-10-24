import WalletIcon from "../../assets/svg/WalletIcon";

export default function ConnectWalletBtn({ text }: { text: string }) {
    return (
        <button className="text-[15px] flex items-center gap-x-[11px] leading-[20px] font-medium text-white px-[14px] py-[9px] bg-black rounded-full w-fit">
            <WalletIcon />
            {text}
        </button>
    );
}
