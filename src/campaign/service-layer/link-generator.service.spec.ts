import { CampaignFakeRepository } from '../repo/campaign.repo';
import { LinkGeneratorService } from './link-generator.service';

jest.setTimeout(3);
describe('Service layer / link generator', () => {
    describe('Link generator service with fake DB', () => {
        it('Will return', async () => {
            const fakeDb = new CampaignFakeRepository();
            const linkGeneratorService = new LinkGeneratorService(fakeDb);
            const link = await linkGeneratorService.generateLink();
            expect(link).toBeDefined();
            expect(link).toHaveProperty('length');
        });
    });
});
