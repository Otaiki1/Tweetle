import { useOutletContext } from "react-router-dom";
import { cairo, CallData, Contract, num, RPC, RpcProvider } from "starknet";
import gameAbi from "../utils/gameAbi.json";
import { useState } from "react";

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    playerDetails: {};
    playerClassicGames: [];
}
const GAME_ADDRESS =
    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e";
const PROVIDER = new RpcProvider({
    nodeUrl:
        "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/xZih3RhtucH0P0PvbFte29FfJzMmJ5E6",
});
const useGameLogic = () => {
    const { account } = useOutletContext<OutletContextType>();
    const [playerClassicGames, setPlayerClassicGames] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);

    // const createNewClassicGame = async () => {
    //     const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

    //     try {
    //         if (!account) {
    //             return;
    //         }
    //         console.log("starting/..............");
    //         const _gameCreated = await gameContract.create_new_classic_game();
    //         console.log("GAME CREATED_______---------", _gameCreated);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const fetchUserClassicGames = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerClassicGames =
                await gameContract.get_player_classic_games(account.address);
            console.log(
                "Players classic games are ====+++++?>>>>>",
                _playerClassicGames
            );
            setPlayerClassicGames(_playerClassicGames);
            return _playerClassicGames;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const fetchUserDailyGame = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerDailyGame = await gameContract.get_daily_game();
            console.log(
                "Players daily game is ====+++++?>>>>>",
                _playerDailyGame
            );
            return _playerDailyGame;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const fetchDailyGameId = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _dailyGameId = await gameContract.get_daily_game_id();
            console.log("daily game id is ====+++++?>>>>>", _dailyGameId);
            return _dailyGameId;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const fetchPlayerDetails = async (address: string) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerDetails = await gameContract.get_player_details(
                address
            );
            // alert("player details is ___" + _playerDetails.game_count);
            console.log("player details is ___", _playerDetails);
            setPlayerDetails(_playerDetails);
            return _playerDetails;
        } catch (err) {
            console.log(err);
            return;
        }
    };
    const fetchClassicGameDetails = async (_gameId: number) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerClassicGameDetails =
                await gameContract.get_player_classic_game(
                    account.address,
                    _gameId
                );
            console.log(
                "CLASSIC GAME DETAIL IS ==============>>>>>",
                _playerClassicGameDetails
            );
            return _playerClassicGameDetails;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const fetchClassicGameAttempts = async (_gameId: number) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerClassicGameAttempts =
                await gameContract.get_player_classic_game_attempts(
                    account?.address,
                    _gameId
                );
            console.log(
                "PLAYER CLASSIC GAME ATTEMPTS IS ---- ==============>>>>>",
                _playerClassicGameAttempts
            );
            return _playerClassicGameAttempts;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const fetchDailyGameAttempts = async (_gameId: number) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerDailyGameAttempts =
                await gameContract.get_player_daily_game_attempts(
                    account?.address,
                    _gameId
                );
            console.log(
                "PLAYER DAILY GAME ATTEMPTS IS ---- ==============>>>>>",
                _playerDailyGameAttempts
            );
            return _playerDailyGameAttempts;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const createNewClassicGame = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);
        try {
            const myCall = gameContract.populate("create_new_classic_game", []);

            const estimatedFee1 = await account.estimateInvokeFee([myCall], {
                version: 3,
            });
            const resourceBounds = {
                ...estimatedFee1.resourceBounds,
                l1_gas: {
                    ...estimatedFee1.resourceBounds.l1_gas,
                    max_amount: num.toHex(
                        BigInt(
                            parseInt(
                                estimatedFee1.resourceBounds.l1_gas.max_amount,
                                16
                            ) * 2
                        ) // Double the estimated amount
                    ),
                },
            };
            const { transaction_hash } = await account.execute(myCall, {
                version: 3,
                maxFee: estimatedFee1.suggestedMaxFee,
                feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
                resourceBounds: resourceBounds,
            });

            console.log("transaction_hash", transaction_hash);
            let receipt = await PROVIDER.waitForTransaction(transaction_hash);
            console.log("receipt", receipt);
            return true;
        } catch (error) {}
    };

    const claimPoints = async (points: number) => {
        try {
            let calls = [
                {
                    contractAddress:
                        "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                    entrypoint: "claim_points",
                    calldata: CallData.compile({
                        points: cairo.uint256(points),
                    }),
                },
            ];

            console.log("sent");

            let call = await account?.getOutsideExecutionPayload({ calls });

            console.log(call);

            const response = await fetch(
                "https://tweetle-bot-backend.onrender.com/player/claim-points/2200639342",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(call),
                }
            );

            console.log("fetch");

            let result = await response.json();

            console.log("RESPONSE IS ==========>>>", result);

            return result;
        } catch (error: any) {
            console.error("Error getting word state:", error);
            return null;
        }
    };

    const getAttempts = async (_isGameDaily: boolean, _gameId: string) => {
        const _gameType = _isGameDaily ? "daily" : "classic";

        const params = new URLSearchParams({
            tg_id: "2200639342",
            gameId: _gameId,
            gameType: _gameType,
        });

        try {
            const _response = await fetch(
                `https://tweetle-bot-backend.onrender.com/game/get-attempts?${params}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let response = await _response.json();
            console.log("RESPONSE IS ==========>>>", response.data);
            const _responseForm = [];
            for (let respObj of response.data) {
                const _innerObj = {
                    attempt: respObj.guess,
                    state: respObj.outcome,
                };
                _responseForm.push(_innerObj);
            }
            return _responseForm;
        } catch (error: any) {
            console.error("Error getting word state:", error);
            return [];
        }
    };

    return {
        fetchUserClassicGames,
        fetchClassicGameDetails,
        fetchPlayerDetails,
        fetchClassicGameAttempts,
        fetchUserDailyGame,
        fetchDailyGameAttempts,
        playerDetails,
        playerClassicGames,
        createNewClassicGame,
        fetchDailyGameId,
        claimPoints,
        getAttempts,
    };
};

export default useGameLogic;
