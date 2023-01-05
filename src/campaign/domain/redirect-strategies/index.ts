import { RoundRobinRedirectStrategy } from './round-robin';
import { RedirectStrategyFactory, RedirectStrategyName } from './types';

export const redirectStrategyFactory: RedirectStrategyFactory = (
    strategyName: RedirectStrategyName,
) => {
    if (strategyName === 'RoundRobin') return new RoundRobinRedirectStrategy();
};
