import { IExit, IPoint, maze } from "src/types/game.types";

type directions = number[][];
type pathMatrixElement = (false | null | number)[];
interface IEraiser {
	x: number;
	y: number;
}

interface IMaze {
	maze: maze;
	exit: IExit;
	playerOnePoint: IPoint;
	playerTwoPoint: IPoint;
}

export function generateMaze(size: number): IMaze {
	const maze = generateDefaultMaze(size);
	const eraiser: IEraiser = { x: 0, y: 0 };

	// for (let y = 0; y < size; y++) {
	// 	const row = [];

	// 	for (let x = 0; x < size; x++) {
	// 		row.push(false);
	// 	}

	// 	maze.push(row);
	// }

	while (!isMazeFinished(maze)) {
		moveEraiser(eraiser, maze);
	}

	const exit = generateExit(size);
	let playerOnePoint: IPoint, playerTwoPoint: IPoint;

	do {
		playerOnePoint = generateRandomPoint(maze);
		playerTwoPoint = generateRandomPoint(maze);
	} while (
		generatePathLength(generatePathMatrix(maze, playerOnePoint, exit), playerOnePoint) !==
		generatePathLength(generatePathMatrix(maze, playerTwoPoint, exit), playerTwoPoint)
	);

	return { maze, exit, playerOnePoint, playerTwoPoint };
}

export function generateDefaultMaze(size: number): maze {
	const maze: maze = [];

	for (let y = 0; y < size; y++) {
		const row = [];

		for (let x = 0; x < size; x++) {
			row.push(false);
		}

		maze.push(row);
	}

	return maze;
}

function moveEraiser(eraiser: IEraiser, maze: maze) {
	maze[eraiser.y][eraiser.x] = true;
	const directions = [];

	if (eraiser.x > 0) {
		directions.push([-2, 0]);
	}

	if (eraiser.x < maze.length - 1) {
		directions.push([2, 0]);
	}

	if (eraiser.y > 0) {
		directions.push([0, -2]);
	}

	if (eraiser.y < maze.length - 1) {
		directions.push([0, 2]);
	}

	const [dx, dy] = getRandomItem(directions);

	eraiser.x += dx;
	eraiser.y += dy;

	if (!maze[eraiser.y][eraiser.x]) {
		maze[eraiser.y][eraiser.x] = true;
		maze[eraiser.y - dy / 2][eraiser.x - dx / 2] = true;
	}
}

function getRandomItem(array: directions) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function isMazeFinished(maze: maze) {
	for (let y = 0; y < maze.length; y += 2) {
		for (let x = 0; x < maze[y].length; x += 2) {
			if (!maze[y][x]) {
				return false;
			}
		}
	}

	return true;
}

function generateExit(size: number): IExit {
	const exitSide = Math.floor(Math.random() * 4);
	let exitX: number, exitY: number;

	switch (exitSide) {
		case 0: // верх
			exitX = 0;
			exitY = Math.floor(Math.random() * Math.floor(size / 2)) * 2;
			break;
		case 1: // право
			exitX = Math.floor(Math.random() * Math.floor(size / 2)) * 2;
			exitY = size - 1;
			break;
		case 2: // низ
			exitX = size - 1;
			exitY = Math.floor(Math.random() * Math.floor(size / 2)) * 2;
			break;
		case 3: // ліво
			exitX = Math.floor(Math.random() * Math.floor(size / 2)) * 2;
			exitY = 0;
			break;
		default:
			exitX = 0;
			exitY = 0;
	}

	return { exitX, exitY };
}

function generateRandomPoint(maze: maze): IPoint {
	let pointX: number, pointY: number;

	do {
		pointX = Math.floor(Math.random() * maze.length);
		pointY = Math.floor(Math.random() * maze.length);
	} while (!maze[pointY][pointX]);
	return {
		pointX,
		pointY,
	};
}

function generatePathMatrix(maze: maze, randomPoint: IPoint, exit: IExit): pathMatrixElement[] {
	const pathMatrix: pathMatrixElement[] = [];

	for (let y = 0; y < maze.length; y++) {
		const row: pathMatrixElement = [];

		for (let x = 0; x < maze[y].length; x++) {
			row.push(null);
		}

		pathMatrix.push(row);
	}

	for (let y = 0; y < maze.length; y++) {
		for (let x = 0; x < maze[y].length; x++) {
			if (maze[y][x] === false) {
				pathMatrix[y][x] = false;
			}
		}
	}

	pathMatrix[exit.exitY][exit.exitX] = 0;
	const { pointX, pointY } = randomPoint;

	while (pathMatrix[pointY][pointX] === null) {
		for (let y = 0; y < maze.length; y++) {
			for (let x = 0; x < maze[y].length; x++) {
				if (pathMatrix[y][x] === false || pathMatrix[y][x] === null) {
					continue;
				}

				const number = (pathMatrix[y][x] as number) + 1;

				if (y > 0 && pathMatrix[y - 1][x] !== false) {
					if (pathMatrix[y - 1][x] === null) {
						pathMatrix[y - 1][x] = number;
					} else {
						pathMatrix[y - 1][x] = Math.min(pathMatrix[y - 1][x] as number, number);
					}
				}

				if (y < maze.length - 1 && pathMatrix[y + 1][x] !== false) {
					if (pathMatrix[y + 1][x] === null) {
						pathMatrix[y + 1][x] = number;
					} else {
						pathMatrix[y + 1][x] = Math.min(pathMatrix[y + 1][x] as number, number);
					}
				}

				if (x > 0 && pathMatrix[y][x - 1] !== false) {
					if (pathMatrix[y][x - 1] === null) {
						pathMatrix[y][x - 1] = number;
					} else {
						pathMatrix[y][x - 1] = Math.min(pathMatrix[y][x - 1] as number, number);
					}
				}

				if (x < maze[0].length - 1 && pathMatrix[y][x + 1] !== false) {
					if (pathMatrix[y][x + 1] === null) {
						pathMatrix[y][x + 1] = number;
					} else {
						pathMatrix[y][x + 1] = Math.min(pathMatrix[y][x + 1] as number, number);
					}
				}
			}
		}
	}

	return pathMatrix;
}

function generatePathLength(pathMatrix: pathMatrixElement[], rendomPoint: IPoint): number {
	let { pointX, pointY } = rendomPoint;
	// eslint-disable-next-line prefer-const
	let pathMatrixElement = pathMatrix[pointY][pointX];
	const path = [[pointX, pointY]];

	while (pathMatrixElement !== 0) {
		(pathMatrixElement as number)--;

		if (pointY > 0 && pathMatrix[pointY - 1][pointX] === pathMatrixElement) {
			path.push([pointX, pointY - 1]);
			pointY--;
			continue;
		}

		if (pointY < pathMatrix.length - 1 && pathMatrix[pointY + 1][pointX] === pathMatrixElement) {
			path.push([pointX, pointY + 1]);
			pointY++;
			continue;
		}

		if (pointX > 0 && pathMatrix[pointY][pointX - 1] === pathMatrixElement) {
			path.push([pointX - 1, pointY]);
			pointX--;
			continue;
		}

		if (pointX < pathMatrix.length - 1 && pathMatrix[pointY][pointX + 1] === pathMatrixElement) {
			path.push([pointX + 1, pointY]);
			pointX++;
			continue;
		}
	}

	return path.length;
}
