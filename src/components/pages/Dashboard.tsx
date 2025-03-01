import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
import useGameLogic from "../../hooks/useGameLogic";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

interface OutletContextType {
    account: any | null;
    updatePlayerDetails: ({}) => void;
    updatePlayerClassicGames: ([]) => void;
    updatePlayerClassicGameCount: (a: number) => void;
    handleOutsideExecution: () => boolean;
    isAccountDeployed: boolean;
}

const Dashboard = () => {
    const {
        account,
        updatePlayerDetails,
        updatePlayerClassicGameCount,
        updatePlayerClassicGames,
        handleOutsideExecution,
        isAccountDeployed,
    } = useOutletContext<OutletContextType>();
    const { fetchPlayerDetails, fetchUserClassicGames } = useGameLogic();

    useEffect(() => {
        const registerUser = async () => {
            if (!account) return;
            const _isAccountDeployed = await account?.isDeployed();
            if (_isAccountDeployed) return;
            const _playerDetails = await fetchPlayerDetails(account?.address);
            const _isPlayerRegistered = _playerDetails?.is_registered;
            if (_isPlayerRegistered) return;
            const _registeredSuccessfully = await handleOutsideExecution();
            console.log(
                "DID USER REGISTER SUCCESSFULLY",
                _registeredSuccessfully
            );
        };

        const performAllUpdates = async () => {
            const _playerDetails = await fetchPlayerDetails(account?.address);
            const _playerClassicGames = await fetchUserClassicGames();
            updatePlayerDetails(_playerDetails);
            updatePlayerClassicGames(_playerClassicGames);
            updatePlayerClassicGameCount(
                Number(_playerDetails?.classic_game_count)
            );
        };
        if (account) {
            performAllUpdates();
            if (isAccountDeployed) {
                registerUser();
            }
        }
    }, []);
    return (
        <>
            <div className="h-full overflow-auto text-white">
                <HomeHeroSection />
                <div className="bg-black p-2 flex flex-col text-white space-y-4">
                    <GlassCard>
                        <>
                            <div className="flex items-center">
                                <div className="w-3/4">
                                    <DashboardButtons where="/play" hasPair>
                                        <p>DAILY CHALLENGE</p>
                                    </DashboardButtons>
                                </div>

                                <div className="border border-1 flex justify-center items-center p-5 bg-black rounded-r-lg">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.7175 4.61538C12.7175 4.18696 12.5821 3.77608 12.3411 3.47314C12.1 3.17019 11.7732 3 11.4323 3C11.0915 3 10.7646 3.17019 10.5236 3.47314C10.2826 3.77608 10.1472 4.18696 10.1472 4.61538V8.01846C7.67967 8.26615 6.06209 8.87354 4.8729 10.3705C3.68199 11.8652 3.19877 13.9006 3 17H37C36.8012 13.8985 36.318 11.8652 35.1271 10.3705C33.9379 8.87354 32.3186 8.26615 29.8528 8.01631V4.61538C29.8528 4.18696 29.7174 3.77608 29.4764 3.47314C29.2354 3.17019 28.9085 3 28.5677 3C28.2268 3 27.9 3.17019 27.6589 3.47314C27.4179 3.77608 27.2825 4.18696 27.2825 4.61538V7.87415C26.143 7.84615 24.8647 7.84615 23.4271 7.84615H16.5729C15.1353 7.84615 13.857 7.84615 12.7175 7.87415V4.61538Z"
                                            fill="#FEBDE4"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M37 22.3061C37 21.0733 37 19.9771 36.9779 19H3.0221C3 19.9771 3 21.0733 3 22.3061V25.2449C3 30.786 3 33.5572 4.9924 35.2779C6.9848 36.9985 10.1893 37 16.6 37H23.4C29.8107 37 33.0169 37 35.0076 35.2779C36.9983 33.5558 37 30.786 37 25.2449V22.3061ZM23.4 22.6735C22.611 22.6735 21.8543 22.9444 21.2964 23.4266C20.7384 23.9089 20.425 24.5629 20.425 25.2449V28.1837C20.425 28.8657 20.7384 29.5197 21.2964 30.0019C21.8543 30.4842 22.611 30.7551 23.4 30.7551C24.189 30.7551 24.9457 30.4842 25.5036 30.0019C26.0616 29.5197 26.375 28.8657 26.375 28.1837V25.2449C26.375 24.5629 26.0616 23.9089 25.5036 23.4266C24.9457 22.9444 24.189 22.6735 23.4 22.6735ZM23.4 24.8776C23.2873 24.8776 23.1792 24.9163 23.0995 24.9851C23.0198 25.054 22.975 25.1475 22.975 25.2449V28.1837C22.975 28.2811 23.0198 28.3745 23.0995 28.4434C23.1792 28.5123 23.2873 28.551 23.4 28.551C23.5127 28.551 23.6208 28.5123 23.7005 28.4434C23.7802 28.3745 23.825 28.2811 23.825 28.1837V25.2449C23.825 25.1475 23.7802 25.054 23.7005 24.9851C23.6208 24.9163 23.5127 24.8776 23.4 24.8776ZM17.9379 22.7572C18.1709 22.8406 18.3701 22.9819 18.5102 23.1632C18.6503 23.3444 18.725 23.5575 18.725 23.7755V29.6531C18.725 29.9453 18.5907 30.2256 18.3516 30.4323C18.1125 30.639 17.7882 30.7551 17.45 30.7551C17.1118 30.7551 16.7875 30.639 16.5484 30.4323C16.3093 30.2256 16.175 29.9453 16.175 29.6531V26.4351L15.801 26.7584C15.5593 26.953 15.2396 27.059 14.9093 27.054C14.579 27.0489 14.2638 26.9333 14.0302 26.7314C13.7966 26.5294 13.6628 26.257 13.657 25.9715C13.6512 25.686 13.7738 25.4097 13.999 25.2008L16.549 22.9967C16.7272 22.8426 16.9542 22.7376 17.2014 22.695C17.4486 22.6523 17.7049 22.674 17.9379 22.7572Z"
                                            fill="#FEBDE4"
                                        />
                                        <path
                                            d="M14.5942 15V10.53H16.0522C16.5362 10.53 16.9562 10.626 17.3122 10.818C17.6682 11.01 17.9442 11.274 18.1402 11.61C18.3362 11.946 18.4342 12.33 18.4342 12.762C18.4342 13.194 18.3362 13.58 18.1402 13.92C17.9442 14.256 17.6682 14.52 17.3122 14.712C16.9562 14.904 16.5362 15 16.0522 15H14.5942ZM15.5242 14.19H16.0762C16.3682 14.19 16.6202 14.132 16.8322 14.016C17.0442 13.896 17.2082 13.73 17.3242 13.518C17.4442 13.302 17.5042 13.05 17.5042 12.762C17.5042 12.47 17.4442 12.218 17.3242 12.006C17.2082 11.794 17.0442 11.63 16.8322 11.514C16.6202 11.398 16.3682 11.34 16.0762 11.34H15.5242V14.19ZM19.0298 15V10.53H22.0358V11.34H19.9598V12.354H21.9158V13.164H19.9598V14.19H22.0358V15H19.0298ZM24.687 15.072C24.367 15.072 24.069 15.014 23.793 14.898C23.521 14.782 23.283 14.62 23.079 14.412C22.875 14.204 22.715 13.96 22.599 13.68C22.487 13.4 22.431 13.094 22.431 12.762C22.431 12.43 22.487 12.124 22.599 11.844C22.711 11.56 22.869 11.316 23.073 11.112C23.277 10.904 23.515 10.744 23.787 10.632C24.063 10.516 24.363 10.458 24.687 10.458C25.011 10.458 25.301 10.512 25.557 10.62C25.817 10.728 26.037 10.872 26.217 11.052C26.397 11.232 26.525 11.432 26.601 11.652L25.779 12.048C25.703 11.832 25.569 11.654 25.377 11.514C25.189 11.37 24.959 11.298 24.687 11.298C24.423 11.298 24.191 11.36 23.991 11.484C23.791 11.608 23.635 11.78 23.523 12C23.415 12.216 23.361 12.47 23.361 12.762C23.361 13.054 23.415 13.31 23.523 13.53C23.635 13.75 23.791 13.922 23.991 14.046C24.191 14.17 24.423 14.232 24.687 14.232C24.959 14.232 25.189 14.162 25.377 14.022C25.569 13.878 25.703 13.698 25.779 13.482L26.601 13.878C26.525 14.098 26.397 14.298 26.217 14.478C26.037 14.658 25.817 14.802 25.557 14.91C25.301 15.018 25.011 15.072 24.687 15.072Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3/4">
                                    <DashboardButtons where="/classic" hasPair>
                                        <p>CLASSIC</p>
                                    </DashboardButtons>
                                </div>

                                <div className="border border-1 flex justify-center items-center p-4 bg-black rounded-r-lg">
                                    <div className="text-center">
                                        <p className="text-xl">24</p>
                                        <p className="text-sm text-[#6AAA64]">
                                            Played
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    </GlassCard>
                    <div className="flex justify-between h-[50%]">
                        <DashboardButtons where="/">
                            <p className="w-[50%] mx-auto text-center">
                                WORD FEVER
                            </p>
                        </DashboardButtons>
                        <DashboardButtons where="/">
                            <p className="w-[50%] mx-auto text-center">
                                SECRET WORD
                            </p>
                        </DashboardButtons>
                    </div>
                    <p className="text-white text-center">
                        How to Play!{" "}
                        <img
                            src={arrowRight}
                            alt="arrow-right"
                            className="inline"
                        />
                    </p>
                    <div className="">
                        <PwdByStrk />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
