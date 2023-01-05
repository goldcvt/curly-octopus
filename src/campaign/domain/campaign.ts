import { Injectable } from '@nestjs/common';
import {
    RedirectStrategyInterface,
    RedirectStrategyName,
} from './redirect-strategies/types';
import { redirectStrategyFactory } from './redirect-strategies/index';
import { TargetsData } from './types';

export interface CampaignInterface {
    sourceLink: string;
    targets: TargetsData;
    redirectStrategy: RedirectStrategyInterface;
    visits?: unknown;
}

@Injectable()
export class Campaign implements CampaignInterface {
    redirectStrategy: RedirectStrategyInterface;
    // sourceLink will be passed here bc we'd like to check if generated link is unique in DB
    // we could inject source link generator here but uhm let's keep layers
    sourceLink: string;
    targets: TargetsData;
    visits?: unknown = undefined;

    constructor(
        targetUrls: string[],
        redirectStrategyName: RedirectStrategyName,
        sourceLink: string,
    ) {
        this.targets = targetUrls.map((targetUrl: string) => {
            const targetData = {
                targetUrl,
                visits: 0,
            };
            if (redirectStrategyName === 'RoundRobin') return targetData;
            return { ...targetData, conversions: 0 };
        });
        this.redirectStrategy = redirectStrategyFactory(redirectStrategyName);
        this.sourceLink = sourceLink;
    }

    pickTargetUrl(): string {
        return this.redirectStrategy.pickTargetUrl(this.targets);
    }
}
