# Solidity API

## IChessFishNFT

https://github.com/partylikeits1983

_This contract handles the logic for storing wagers between users, storing game moves, and handling the payout of 1v1 matches.
The Tournament Contract is able to call into this contract to create matches between users._

### awardWinner

```solidity
function awardWinner(address player, address wagerHash) external returns (uint256)
```

## ChessWager

### GameWager

```solidity
struct GameWager {
  address player0;
  address player1;
  address wagerToken;
  uint256 wager;
  uint256 numberOfGames;
  bool hasPlayerAccepted;
  uint256 timeLimit;
  uint256 timeLastMove;
  uint256 timePlayer0;
  uint256 timePlayer1;
  bool isTournament;
}
```

### WagerStatus

```solidity
struct WagerStatus {
  bool isPlayer0White;
  uint256 winsPlayer0;
  uint256 winsPlayer1;
}
```

### Game

```solidity
struct Game {
  uint16[] moves;
}
```

### gameWagers

```solidity
mapping(address => struct ChessWager.GameWager) gameWagers
```

_address wager => GameWager_

### games

```solidity
mapping(address => mapping(uint256 => struct ChessWager.Game)) games
```

_address wager => gameID => Game_

### gameIDs

```solidity
mapping(address => uint256[]) gameIDs
```

_address wager => gameIDs_

### wagerStatus

```solidity
mapping(address => struct ChessWager.WagerStatus) wagerStatus
```

_addres wager => Player Wins_

### userGames

```solidity
mapping(address => address[]) userGames
```

_player can see game challenges_

### allWagers

```solidity
address[] allWagers
```

_address[] wagers_

### ChessFishToken

```solidity
address ChessFishToken
```

_CFSH Token Address_

### DividendSplitter

```solidity
address DividendSplitter
```

_Dividend Splitter contract_

### ChessFishNFT

```solidity
address ChessFishNFT
```

_ChessFish Winner NFT contract_

### constructor

```solidity
constructor(address moveVerificationAddress, address _ChessFishToken, address _DividendSplitter, address _ChessFishNFT) public
```

### createGameWagerEvent

```solidity
event createGameWagerEvent(address wager, address player1, address wagerToken, uint256 wagerAmount, uint256 timeLimit, uint256 numberOfGames)
```

### acceptWagerEvent

```solidity
event acceptWagerEvent(address wagerAddress, address userAddress)
```

### playMoveEvent

```solidity
event playMoveEvent(address wagerAddress, uint16 move)
```

### payoutWagerEvent

```solidity
event payoutWagerEvent(address wagerAddress, address winner, address wagerToken, uint256 wagerAmount, uint256 protocolFee)
```

### cancelWagerEvent

```solidity
event cancelWagerEvent(address wagerAddress, address userAddress)
```

### getAllWagersCount

```solidity
function getAllWagersCount() external view returns (uint256)
```

### getAllWagerAddresses

```solidity
function getAllWagerAddresses() external view returns (address[])
```

### getAllUserGames

```solidity
function getAllUserGames(address player) external view returns (address[])
```

### getGameLength

```solidity
function getGameLength(address wagerAddress) external view returns (uint256)
```

### getGameMoves

```solidity
function getGameMoves(address wagerAddress, uint256 gameID) external view returns (struct ChessWager.Game)
```

### getNumberOfGamesPlayed

```solidity
function getNumberOfGamesPlayed(address wagerAddress) internal view returns (uint256)
```

### getWagerStatus

```solidity
function getWagerStatus(address wagerAddress) external view returns (address, address, uint256, uint256)
```

### getWagerAddress

```solidity
function getWagerAddress(struct ChessWager.GameWager wager) internal view returns (address)
```

### checkTimeRemaining

```solidity
function checkTimeRemaining(address wagerAddress) public view returns (int256, int256)
```

### getPlayerMove

```solidity
function getPlayerMove(address wagerAddress) public view returns (address)
```

### isPlayerWhite

```solidity
function isPlayerWhite(address wagerAddress, address player) public view returns (bool)
```

### getGameStatus

```solidity
function getGameStatus(address wagerAddress) public view returns (uint8, uint256, uint32, uint32)
```

### TournamentHandler

```solidity
address TournamentHandler
```

### onlyTournament

```solidity
modifier onlyTournament()
```

### addTournamentHandler

```solidity
function addTournamentHandler(address _tournamentHandler) external
```

### createGameWagerTournament

```solidity
function createGameWagerTournament(address player0, address player1, address wagerToken, uint256 wager, uint256 timeLimit, uint256 numberOfGames) external returns (address wagerAddress)
```

### createGameWager

```solidity
function createGameWager(address player1, address wagerToken, uint256 wager, uint256 timeLimit, uint256 numberOfGames) external payable returns (address wagerAddress)
```

### acceptWager

```solidity
function acceptWager(address wagerAddress) external payable
```

### playMove

```solidity
function playMove(address wagerAddress, uint16 move) external returns (bool)
```

### payoutWager

```solidity
function payoutWager(address wagerAddress) external returns (bool)
```

### cancelWager

```solidity
function cancelWager(address wagerAddress) external returns (bool)
```

### updateWagerStateTime

```solidity
function updateWagerStateTime(address wagerAddress) public returns (bool)
```

_check when called with timeout w tournament_

### receive

```solidity
receive() external payable
```

### fallback

```solidity
fallback() external payable
```

## MoveHelper

https://github.com/partylikeits1983

_This contract handles move conversion functionality to the MoveVerifican contract as well as admin functionality._

### pieces

```solidity
mapping(uint8 => string) pieces
```

### coordinates

```solidity
mapping(string => uint256) coordinates
```

_algebraic chess notation string => uint (0-63)_

### squareToCoordinate

```solidity
mapping(uint256 => string) squareToCoordinate
```

### deployer

```solidity
address deployer
```

_address deployer_

### moveVerification

```solidity
contract MoveVerification moveVerification
```

_MoveVerification contract_

### protocolFee

```solidity
uint256 protocolFee
```

_5% fee to token holders_

### OnlyDeployer

```solidity
modifier OnlyDeployer()
```

### updateFee

```solidity
function updateFee(uint256 _fee) external
```

_update fee function for 1v1 matches_

### initCoordinates

```solidity
function initCoordinates(string[64] coordinate, uint256[64] value) external
```

_called from ts since hardcoding the mapping makes the contract too large_

### initPieces

```solidity
function initPieces() internal
```

_Initialize pieces
This function significantly increases the size of the compiled bytecode..._

### getLetter

```solidity
function getLetter(uint8 piece) public view returns (string)
```

_Convert the number of a piece to the string character
        @param piece is the number of the piece
        @return string is the letter of the piece_

### convertFromMove

```solidity
function convertFromMove(uint16 move) public pure returns (uint8, uint8)
```

_Converts a move from a 16-bit integer to a 2 8-bit integers.
        @param move is the move to convert
        @return fromPos and toPos_

### convertToMove

```solidity
function convertToMove(uint8 fromPos, uint8 toPos) public pure returns (uint16)
```

_Converts two 8-bit integers to a 16-bit integer
        @param fromPos is the position to move a piece from.
        @param toPos is the position to move a piece to.
        @return move_

### moveToHex

```solidity
function moveToHex(string move) external view returns (uint16 hexMove)
```

_Converts an algebraic chess notation string move to uint16 format
        @param move is the move to convert i.e. e2e4 to hex move
        @return hexMove is the resulting uint16 value_

### hexToMove

```solidity
function hexToMove(uint16 hexMove) public view returns (string move)
```

_Converts a uint16 hex value to move in algebraic chess notation
        @param hexMove is the move to convert to string 
        @return move is the resulting string value_

### getBoard

```solidity
function getBoard(uint256 gameState) external view returns (string[64])
```

_returns string of letters representing the board
        @dev only to be called by user or ui
        @param gameState is the uint256 game state of the board 
        @return string[64] is the resulting array_

## MoveVerification

https://github.com/partylikeits1983
Forked from: https://github.com/marioevz/chess.eth (Updated from Solidity 0.7.6 to 0.8.17 & Added features and functionality)

This contract handles the logic for verifying the validity moves on the chessboard. Currently, pawns autoqueen by default.

### empty_const

```solidity
uint8 empty_const
```

### pawn_const

```solidity
uint8 pawn_const
```

### bishop_const

```solidity
uint8 bishop_const
```

### knight_const

```solidity
uint8 knight_const
```

### rook_const

```solidity
uint8 rook_const
```

### queen_const

```solidity
uint8 queen_const
```

### king_const

```solidity
uint8 king_const
```

### type_mask_const

```solidity
uint8 type_mask_const
```

### color_const

```solidity
uint8 color_const
```

### piece_bit_size

```solidity
uint8 piece_bit_size
```

### piece_pos_shift_bit

```solidity
uint8 piece_pos_shift_bit
```

### en_passant_const

```solidity
uint32 en_passant_const
```

### king_pos_mask

```solidity
uint32 king_pos_mask
```

### king_pos_zero_mask

```solidity
uint32 king_pos_zero_mask
```

### king_pos_bit

```solidity
uint16 king_pos_bit
```

### rook_king_side_move_mask

```solidity
uint32 rook_king_side_move_mask
```

_For castling masks, mask only the last bit of an uint8, to block any under/overflows._

### rook_king_side_move_bit

```solidity
uint16 rook_king_side_move_bit
```

### rook_queen_side_move_mask

```solidity
uint32 rook_queen_side_move_mask
```

### rook_queen_side_move_bit

```solidity
uint16 rook_queen_side_move_bit
```

### king_move_mask

```solidity
uint32 king_move_mask
```

### pieces_left_bit

```solidity
uint16 pieces_left_bit
```

### king_white_start_pos

```solidity
uint8 king_white_start_pos
```

### king_black_start_pos

```solidity
uint8 king_black_start_pos
```

### pos_move_mask

```solidity
uint16 pos_move_mask
```

### request_draw_const

```solidity
uint16 request_draw_const
```

### accept_draw_const

```solidity
uint16 accept_draw_const
```

### resign_const

```solidity
uint16 resign_const
```

### inconclusive_outcome

```solidity
uint8 inconclusive_outcome
```

### draw_outcome

```solidity
uint8 draw_outcome
```

### white_win_outcome

```solidity
uint8 white_win_outcome
```

### black_win_outcome

```solidity
uint8 black_win_outcome
```

### game_state_start

```solidity
uint256 game_state_start
```

### full_long_word_mask

```solidity
uint256 full_long_word_mask
```

### invalid_move_constant

```solidity
uint256 invalid_move_constant
```

### initial_white_state

```solidity
uint32 initial_white_state
```

_Initial white state:
                0f: 15 (non-king) pieces left
                00: Queen-side rook at a1 position
                07: King-side rook at h1 position
                04: King at e1 position
                ff: En-passant at invalid position_

### initial_black_state

```solidity
uint32 initial_black_state
```

_Initial black state:
                0f: 15 (non-king) pieces left
                38: Queen-side rook at a8 position
                3f: King-side rook at h8 position
                3c: King at e8 position
                ff: En-passant at invalid position_

### checkGameFromStart

```solidity
function checkGameFromStart(uint16[] moves) public pure returns (uint8, uint256, uint32, uint32)
```

### checkGame

```solidity
function checkGame(uint256 startingGameState, uint32 startingPlayerState, uint32 startingOpponentState, bool startingTurnBlack, uint16[] moves) public pure returns (uint8 outcome, uint256 gameState, uint32 playerState, uint32 opponentState)
```

_Calculates the outcome of a game depending on the moves from a starting position.
             Reverts when an invalid move is found.
        @param startingGameState Game state from which start the movements
        @param startingPlayerState State of the first playing player
        @param startingOpponentState State of the other playing player
        @param startingTurnBlack Whether the starting player is the black pieces
        @param moves is the input array containing all the moves in the game
        @return outcome can be 0 for inconclusive, 1 for draw, 2 for white winning, 3 for black winning_

### verifyExecuteMove

```solidity
function verifyExecuteMove(uint256 gameState, uint16 move, uint32 playerState, uint32 opponentState, bool currentTurnBlack) public pure returns (uint256 newGameState, uint32 newPlayerState, uint32 newOpponentState)
```

_Calculates the outcome of a single move given the current game state.
             Reverts for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param move is the move to execute: 16-bit var, high word = from pos, low word = to pos
                move can also be: resign, request draw, accept draw.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecutePawnMove

```solidity
function verifyExecutePawnMove(uint256 gameState, uint8 fromPos, uint8 toPos, uint8 moveExtra, bool currentTurnBlack, uint32 playerState, uint32 opponentState) public pure returns (uint256 newGameState, uint32 newPlayerState)
```

_Calculates the outcome of a single move of a pawn given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecuteKnightMove

```solidity
function verifyExecuteKnightMove(uint256 gameState, uint8 fromPos, uint8 toPos, bool currentTurnBlack) public pure returns (uint256)
```

_Calculates the outcome of a single move of a knight given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecuteBishopMove

```solidity
function verifyExecuteBishopMove(uint256 gameState, uint8 fromPos, uint8 toPos, bool currentTurnBlack) public pure returns (uint256)
```

_Calculates the outcome of a single move of a bishop given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecuteRookMove

```solidity
function verifyExecuteRookMove(uint256 gameState, uint8 fromPos, uint8 toPos, bool currentTurnBlack) public pure returns (uint256)
```

_Calculates the outcome of a single move of a rook given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecuteQueenMove

```solidity
function verifyExecuteQueenMove(uint256 gameState, uint8 fromPos, uint8 toPos, bool currentTurnBlack) public pure returns (uint256)
```

_Calculates the outcome of a single move of the queen given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### verifyExecuteKingMove

```solidity
function verifyExecuteKingMove(uint256 gameState, uint8 fromPos, uint8 toPos, bool currentTurnBlack, uint32 playerState) public pure returns (uint256 newGameState, uint32 newPlayerState)
```

_Calculates the outcome of a single move of the king given the current game state.
             Returns invalid_move_constant for invalid movement.
        @param gameState current game state on which to perform the movement.
        @param fromPos is position moving from. Behavior is undefined for values >= 0x40.
        @param toPos is position moving to. Behavior is undefined for values >= 0x40.
        @param currentTurnBlack true if it's black turn
        @return newGameState the new game state after it's executed._

### checkQueenValidMoves

```solidity
function checkQueenValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, bool currentTurnBlack) public pure returns (bool)
```

_Checks if a move is valid for the queen in the given game state.
            Returns true if the move is valid, false otherwise.
        @param gameState The current game state on which to perform the movement.
        @param fromPos The position from which the queen is moving.
        @param playerState The player's state containing information about the king position.
        @param currentTurnBlack True if it's black's turn, false otherwise.
        @return A boolean indicating whether the move is valid or not._

### checkBishopValidMoves

```solidity
function checkBishopValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, bool currentTurnBlack) public pure returns (bool)
```

_Checks if a move is valid for the bishop in the given game state.
            Returns true if the move is valid, false otherwise.
        @param gameState The current game state on which to perform the movement.
        @param fromPos The position from which the bishop is moving. Behavior is undefined for values >= 0x40.
        @param playerState The player's state containing information about the king position.
        @param currentTurnBlack True if it's black's turn, false otherwise.
        @return A boolean indicating whether the move is valid or not._

### checkRookValidMoves

```solidity
function checkRookValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, bool currentTurnBlack) public pure returns (bool)
```

_Checks if a move is valid for the rook in the given game state.
            Returns true if the move is valid, false otherwise.
        @param gameState The current game state on which to perform the movement.
        @param fromPos The position from which the rook is moving. Behavior is undefined for values >= 0x40.
        @param playerState The player's state containing information about the king position.
        @param currentTurnBlack True if it's black's turn, false otherwise.
        @return A boolean indicating whether the move is valid or not._

### checkKnightValidMoves

```solidity
function checkKnightValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, bool currentTurnBlack) public pure returns (bool)
```

_Checks if a move is valid for the knight in the given game state.
            Returns true if the move is valid, false otherwise.
        @param gameState The current game state on which to perform the movement.
        @param fromPos The position from which the knight is moving. Behavior is undefined for values >= 0x40.
        @param playerState The player's state containing information about the king position.
        @param currentTurnBlack True if it's black's turn, false otherwise.
        @return A boolean indicating whether the move is valid or not._

### checkPawnValidMoves

```solidity
function checkPawnValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, uint32 opponentState, bool currentTurnBlack) public pure returns (bool)
```

_Checks if a move is valid for the pawn in the given game state.
            Returns true if the move is valid, false otherwise.
        @param gameState The current game state on which to perform the movement.
        @param fromPos The position from which the knight is moving. Behavior is undefined for values >= 0x40.
        @param playerState The player's state containing information about the king position.
        @param currentTurnBlack True if it's black's turn, false otherwise.
        @return A boolean indicating whether the move is valid or not._

### checkKingValidMoves

```solidity
function checkKingValidMoves(uint256 gameState, uint8 fromPos, uint32 playerState, bool currentTurnBlack) public pure returns (bool)
```

### searchPiece

```solidity
function searchPiece(uint256 gameState, uint32 playerState, uint32 opponentState, uint8 color, uint16 pBitOffset, uint16 bitSize) public pure returns (bool)
```

_Performs one iteration of recursive search for pieces. 
        @param gameState Game state from which start the movements
        @param playerState State of the player
        @param opponentState State of the opponent
        @return returns true if any of the pieces in the current offest has legal moves_

### checkEndgame

```solidity
function checkEndgame(uint256 gameState, uint32 playerState, uint32 opponentState) public pure returns (uint8)
```

_Checks the endgame state and determines whether the last user is checkmate'd or
             stalemate'd, or neither.
        @param gameState Game state from which start the movements
        @param playerState State of the player
        @return outcome can be 0 for inconclusive/only check, 1 stalemate, 2 checkmate_

### getInBetweenMask

```solidity
function getInBetweenMask(uint8 fromPos, uint8 toPos) public pure returns (uint256)
```

_Gets the mask of the in-between squares.
             Basically it performs bit-shifts depending on the movement.
             Down: >> 8
             Up: << 8
             Right: << 1
             Left: >> 1
             UpRight: << 9
             DownLeft: >> 9
             DownRight: >> 7
             UpLeft: << 7
             Reverts for invalid movement.
        @param fromPos is position moving from.
        @param toPos is position moving to.
        @return mask of the in-between squares, can be bit-wise-and with the game state to check squares_

### getPositionMask

```solidity
function getPositionMask(uint8 pos) public pure returns (uint256)
```

_Gets the mask (0xF) of a square
        @param pos square position.
        @return mask_

### getHorizontalMovement

```solidity
function getHorizontalMovement(uint8 fromPos, uint8 toPos) public pure returns (uint8)
```

_Calculates the horizontal movement between two positions on a chessboard.
        @param fromPos The starting position from which the movement is measured.
        @param toPos The ending position to which the movement is measured.
        @return The horizontal movement between the two positions._

### getVerticalMovement

```solidity
function getVerticalMovement(uint8 fromPos, uint8 toPos) public pure returns (uint8)
```

_Calculates the vertical movement between two positions on a chessboard.
        @param fromPos The starting position from which the movement is measured.
        @param toPos The ending position to which the movement is measured.
        @return The vertical movement between the two positions._

### checkForCheck

```solidity
function checkForCheck(uint256 gameState, uint32 playerState) public pure returns (bool)
```

_Checks if the king in the given game state is under attack (check condition).
        @param gameState The current game state to analyze.
        @param playerState The player's state containing information about the king position.
        @return A boolean indicating whether the king is under attack (check) or not._

### pieceUnderAttack

```solidity
function pieceUnderAttack(uint256 gameState, uint8 pos) public pure returns (bool)
```

_Checks if a piece at the given position is under attack in the given game state.
    @param gameState The current game state to analyze.
    @param pos The position of the piece to check for attack.
    @return A boolean indicating whether the piece at the given position is under attack._

### commitMove

```solidity
function commitMove(uint256 gameState, uint8 fromPos, uint8 toPos) public pure returns (uint256)
```

_Commits a move into the game state. Validity of the move is not checked.
        @param gameState current game state
        @param fromPos is the position to move a piece from.
        @param toPos is the position to move a piece to.
        @return newGameState_

### zeroPosition

```solidity
function zeroPosition(uint256 gameState, uint8 pos) public pure returns (uint256)
```

_Zeroes out a piece position in the current game state.
             Behavior is undefined for position values greater than 0x3f
        @param gameState current game state
        @param pos is the position to zero out: 6-bit var, 3-bit word, high word = row, low word = column.
        @return newGameState_

### setPosition

```solidity
function setPosition(uint256 gameState, uint8 pos, uint8 piece) public pure returns (uint256 newGameState)
```

_Sets a piece position in the current game state.
             Behavior is undefined for position values greater than 0x3f
        @param gameState current game state
        @param pos is the position to set the piece: 6-bit var, 3-bit word, high word = row, low word = column.
        @param piece to set, including color
        @return newGameState_

### pieceAtPosition

```solidity
function pieceAtPosition(uint256 gameState, uint8 pos) public pure returns (uint8)
```

_Gets the piece at a given position in the current gameState.
             Behavior is undefined for position values greater than 0x3f
        @param gameState current game state
        @param pos is the position to get the piece: 6-bit var, 3-bit word, high word = row, low word = column.
        @return piece value including color_

## ChessFishTournament

https://github.com/partylikeits1983
Forked from: https://github.com/marioevz/chess.eth (Updated from Solidity 0.7.6 to 0.8.17 & Added features and functionality)

This contract handles the functionality of creating Round Robbin style tournaments as well as handling the payouts of ERC-20 tokens to tournament winners.
This contract creates wagers in the ChessWager smart contract and then reads the result of the created wagers to calculate the number of wins for each user in the tournament.

### tournamentNonce

```solidity
uint256 tournamentNonce
```

_increments for each new tournament_

### tournaments

```solidity
mapping(uint256 => struct ChessFishTournament.Tournament) tournaments
```

_uint tournamentNonce => Tournament struct_

### tournamentWagerAddresses

```solidity
mapping(uint256 => address[]) tournamentWagerAddresses
```

_uint tournament nonce => address[] wagerIDs_

### Tournament

```solidity
struct Tournament {
  uint256 numberOfPlayers;
  address[] players;
  uint256 numberOfGames;
  address token;
  uint256 tokenAmount;
  bool isInProgress;
  uint256 startTime;
  uint256 timeLimit;
  bool isComplete;
}
```

### PlayerWins

```solidity
struct PlayerWins {
  address player;
  uint256 wins;
}
```

### tournamentWins

```solidity
mapping(uint256 => mapping(address => uint256)) tournamentWins
```

_uint tournamentID = > address player => wins_

### protocolFee

```solidity
uint256 protocolFee
```

_7% protocol fee_

### payoutProfile3

```solidity
uint256[3] payoutProfile3
```

_60% 35%_

### payoutProfile4_9

```solidity
uint256[4] payoutProfile4_9
```

_40% 25% 20% 15%_

### payoutProfile10_25

```solidity
uint256[7] payoutProfile10_25
```

_40% 25% 1% 10% 5% 2.5% 2.5%_

### ChessWagerAddress

```solidity
address ChessWagerAddress
```

### PaymentSplitter

```solidity
address PaymentSplitter
```

### deployer

```solidity
address deployer
```

### constructor

```solidity
constructor(address _chessWager, address _paymentSplitter) public
```

### getTournamentPlayers

```solidity
function getTournamentPlayers(uint256 tournamentID) external view returns (address[])
```

### getTournamentWagerAddresses

```solidity
function getTournamentWagerAddresses(uint256 tournamentID) external view returns (address[])
```

### viewTournamentScore

```solidity
function viewTournamentScore(uint256 tournamentID) external view returns (address[], uint256[])
```

_used to calculate score but only designed for view as this will lead to more gas_

### checkIfPlayerAlreadyJoined

```solidity
function checkIfPlayerAlreadyJoined(uint256 tournamentID, address player) internal view returns (bool)
```

### isPlayerInTournament

```solidity
function isPlayerInTournament(uint256 tournamentID, address player) internal view returns (bool)
```

### getPlayersSortedByWins

```solidity
function getPlayersSortedByWins(uint256 tournamentID) public view returns (address[])
```

_returns addresses winners sorted by highest wins_

### createTournament

```solidity
function createTournament(uint256 numberOfPlayers, uint256 numberOfGames, address token, uint256 tokenAmount, uint256 timeLimit) external
```

### joinTournament

```solidity
function joinTournament(uint256 tournamentID) external
```

### startTournament

```solidity
function startTournament(uint256 tournamentID) external
```

### exitTournament

```solidity
function exitTournament(uint256 tournamentID) external
```

### payoutTournament

```solidity
function payoutTournament(uint256 tournamentID) external
```

### tallyWins

```solidity
function tallyWins(uint256 tournamentID) internal returns (address[], uint256[])
```

_used to calculate wins, saving score to storage._

## IChessFishNFT

### awardWinner

```solidity
function awardWinner(address player, address wagerHash) external returns (uint256)
```

## IChessWager

### createGameWagerTournament

```solidity
function createGameWagerTournament(address player0, address player1, address wagerToken, uint256 wager, uint256 timeLimit, uint256 numberOfGames) external returns (address)
```

### getWagerStatus

```solidity
function getWagerStatus(address wagerAddress) external view returns (address, address, uint256, uint256)
```

## Math

_Standard math utilities missing in the Solidity language._

### max

```solidity
function max(uint8 a, uint8 b) internal pure returns (uint256)
```

_Returns the largest of two numbers._

### min

```solidity
function min(uint8 a, uint8 b) internal pure returns (uint256)
```

_Returns the smallest of two numbers._

## Token

### _initial_supply

```solidity
uint256 _initial_supply
```

### value

```solidity
uint256 value
```

### constructor

```solidity
constructor() public
```

### mint

```solidity
function mint(uint256 amount) external
```

## ChessFishToken

### _initial_supply

```solidity
uint256 _initial_supply
```

### name_

```solidity
string name_
```

### symbol_

```solidity
string symbol_
```

### constructor

```solidity
constructor() public
```

## CrowdSale

### deployer

```solidity
address deployer
```

### ChessFishToken

```solidity
address ChessFishToken
```

### TokensPurchased

```solidity
event TokensPurchased(address buyer, uint256 amount, uint256 weiSpent)
```

### OnlyDeployer

```solidity
modifier OnlyDeployer()
```

### constructor

```solidity
constructor(address _chessFishToken) public
```

### deposit

```solidity
function deposit(uint256 amount) external
```

### withdraw

```solidity
function withdraw() external
```

### getChessFishTokens

```solidity
function getChessFishTokens() external payable
```

### endCrowdSale

```solidity
function endCrowdSale() external
```

## PaymentSplitter

_This contract allows to split Ether payments among a group of accounts. The sender does not need to be aware
that the Ether will be split in this way, since it is handled transparently by the contract.

The split can be in equal parts or in any other arbitrary proportion. The way this is specified is by assigning each
account to a number of shares. Of all the Ether that this contract receives, each account will then be able to claim
an amount proportional to the percentage of total shares they were assigned. The distribution of shares is set at the
time of contract deployment and can't be updated thereafter.

`PaymentSplitter` follows a _pull payment_ model. This means that payments are not automatically forwarded to the
accounts but kept in this contract, and the actual transfer is triggered as a separate step by calling the {release}
function.

NOTE: This contract assumes that ERC20 tokens will behave similarly to native tokens (Ether). Rebasing tokens, and
tokens that apply fees during transfers, are likely to not be supported as expected. If in doubt, we encourage you
to run tests before sending real value to this contract._

### PayeeAdded

```solidity
event PayeeAdded(address account, uint256 shares)
```

### PaymentReleased

```solidity
event PaymentReleased(address to, uint256 amount)
```

### ERC20PaymentReleased

```solidity
event ERC20PaymentReleased(contract IERC20 token, address to, uint256 amount)
```

### PaymentReceived

```solidity
event PaymentReceived(address from, uint256 amount)
```

### CFSH_token

```solidity
address CFSH_token
```

### constructor

```solidity
constructor(address _token) public
```

_Creates an instance of `PaymentSplitter` where each account in `payees` is assigned the number of shares at
the matching position in the `shares` array.

All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
duplicates in `payees`._

### receive

```solidity
receive() external payable
```

_The Ether received will be logged with {PaymentReceived} events. Note that these events are not fully
reliable: it's possible for a contract to receive Ether without triggering this function. This only affects the
reliability of the events, and not the actual splitting of Ether.

To learn more about this see the Solidity documentation for
https://solidity.readthedocs.io/en/latest/contracts.html#fallback-function[fallback
functions]._

### totalShares

```solidity
function totalShares() public view returns (uint256)
```

_Getter for the total shares held by payees._

### totalReleasedNative

```solidity
function totalReleasedNative() public view returns (uint256)
```

_Getter for the total amount of Ether already released._

### totalReleasedERC20

```solidity
function totalReleasedERC20(contract IERC20 token) public view returns (uint256)
```

_Getter for the total amount of `token` already released. `token` should be the address of an IERC20
contract._

### shares

```solidity
function shares(address account) public view returns (uint256)
```

_Getter for the amount of shares held by an account._

### releasedNative

```solidity
function releasedNative(address account) public view returns (uint256)
```

_Getter for the amount of Ether already released to a payee._

### releasedERC20

```solidity
function releasedERC20(contract IERC20 token, address account) public view returns (uint256)
```

_Getter for the amount of `token` tokens already released to a payee. `token` should be the address of an
IERC20 contract._

### releasableNative

```solidity
function releasableNative(address account) public view returns (uint256)
```

_Getter for the amount of payee's releasable Ether._

### releasableERC20

```solidity
function releasableERC20(contract IERC20 token, address account) public view returns (uint256)
```

_Getter for the amount of payee's releasable `token` tokens. `token` should be the address of an
IERC20 contract._

### releaseNative

```solidity
function releaseNative(address payable account) public
```

_Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the
total shares and their previous withdrawals._

### releaseERC20

```solidity
function releaseERC20(contract IERC20 token, address account) public
```

_Triggers a transfer to `account` of the amount of `token` tokens they are owed, according to their
percentage of the total shares and their previous withdrawals. `token` must be the address of an IERC20
contract._

## ChessFishNFT

### wagerHashes

```solidity
mapping(address => address) wagerHashes
```

### ChessWager

```solidity
address ChessWager
```

### deployer

```solidity
address deployer
```

### onlyChessFishWager

```solidity
modifier onlyChessFishWager()
```

### onlyDeployer

```solidity
modifier onlyDeployer()
```

### constructor

```solidity
constructor() public
```

### setChessFishAddress

```solidity
function setChessFishAddress(address _chessFish) external
```

### awardWinner

```solidity
function awardWinner(address player, address wagerHash) external returns (uint256)
```
