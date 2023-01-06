import { CampaignInterface } from '../domain/campaign';
import { Injectable } from '@nestjs/common';
import { CampaignExistsError, CampaignNotExists, Visit } from '../domain/types';

// This is an aggregate
// Shoul've used abstract class with fake implementation for DI to work properly
export interface CampaignRepositoryInterface {
    // get by generated url
    getBySourceUrl(sourceUrl: string): Promise<CampaignInterface | undefined>;
    // add campaign (gen-target structure) with target urls
    addCampaign(campaign: CampaignInterface): Promise<void>;
    // list all campaigns
    listCampaigns(): Promise<CampaignInterface[]>;

    updateVisitsInCampaign(
        sourceUrl: string,
        targetUrl: string,
    ): Promise<number>;

    // probably will throw paging at it, right?
    loadVisits(sourceUrl: string): Promise<void>;
}

@Injectable()
export class CampaignFakeRepository implements CampaignRepositoryInterface {
    private campaigns = new Map<string, CampaignInterface>();
    private visits = new Map<string, Visit>();

    async getBySourceUrl(
        sourceUrl: string,
    ): Promise<CampaignInterface | undefined> {
        return this.campaigns.get(sourceUrl);
    }

    async addCampaign(campaign: CampaignInterface): Promise<void> {
        if (this.campaigns.has(campaign.sourceLink))
            throw new CampaignExistsError(
                `Tried to create existing campaign with source link ${campaign.sourceLink}`,
            );
        this.campaigns.set(campaign.sourceLink, campaign);
    }

    async listCampaigns(): Promise<CampaignInterface[]> {
        return [...this.campaigns.entries()].map((iterable) => iterable[1]);
    }
    async updateVisitsInCampaign(
        sourceUrl: string,
        targetUrl: string,
    ): Promise<number> {
        const campaign = this.campaigns.get(sourceUrl);
        if (!campaign)
            throw new CampaignNotExists(
                `Campaign by source link ${sourceUrl} doesn't exist`,
            );
        const target = campaign.targets.find(
            (target) => target.targetUrl === targetUrl,
        );
        if (!target) throw new Error('Impossible error!');
        this.visits.set(sourceUrl, {
            clickedUrl: sourceUrl,
            visitedUrl: targetUrl,
            originalUtmCampaign: undefined,
            originalUtmMedium: undefined,
            originalUtmSource: undefined,
            originalUtmTerm: undefined,
            originalUtmContent: undefined,
            utmCampaign: undefined,
            utmMedium: undefined,
            utmSource: undefined,
            utmTerm: undefined,
            utmContent: undefined,
        });
        return ++target.visits;
    }
    async loadVisits(sourceUrl: string): Promise<void> {
        console.log('Loading visits for source url: ' + sourceUrl);
    }
}
