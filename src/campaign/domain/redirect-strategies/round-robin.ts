import { TargetsData } from '../types';
import { RedirectStrategyInterface } from './types';

export class RoundRobinRedirectStrategy implements RedirectStrategyInterface {
    lastUrlIndex = 0;

    private moveIndex(targets: TargetsData) {
        if (this.lastUrlIndex === targets.length - 1) {
            this.lastUrlIndex = 0;
            return;
        }
        this.lastUrlIndex++;
    }

    pickTargetUrl(targets: TargetsData) {
        const target = targets[this.lastUrlIndex];
        this.moveIndex(targets);
        return target.targetUrl;
    }
}
