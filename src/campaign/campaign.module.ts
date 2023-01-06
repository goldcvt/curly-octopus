import { Module, OnModuleInit } from '@nestjs/common';
import { Campaign } from './domain/campaign';
import { CampaignFakeRepository } from './repo/campaign.repo';
import { LinkGeneratorService } from './service-layer/link-generator.service';

// const campaignRepositoryProvider https://stackoverflow.com/questions/52969037/nestjs-dependency-injection-and-ddd-clean-architecture
@Module({
    imports: [],
    controllers: [],
    providers: [Campaign, CampaignFakeRepository, LinkGeneratorService],
    // LinkGeneratorService isnt a module bc of circular dep
})
export class CampaignModule implements OnModuleInit {
    async onModuleInit() {
        // load all saved url stuff from DB to memory
    }
}
