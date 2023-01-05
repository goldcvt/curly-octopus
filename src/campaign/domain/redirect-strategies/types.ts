import { TargetsData } from '../types';

export type RedirectStrategyName = 'RoundRobin';

export interface RedirectStrategyInterface {
    pickTargetUrl: (targets: TargetsData) => string;
}

export type RedirectStrategyFactory = (
    strategyName: RedirectStrategyName,
) => RedirectStrategyInterface;
