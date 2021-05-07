import request from 'supertest';
import app from '@/server/app';
import { external, internal } from '@/str/url';
import sid from '@/str/id';

describe('Test server status codes and rendered answers', () => {
  test('Landing test', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toInclude(`id="${sid.ridLand}"`);
  });

  test('404-Spa Landing test', async () => {
    const response = await request(app).get('/404');
    expect(response.statusCode).toBe(404);
    expect(response.text).toInclude(`id="${sid.ridSpa}"`);
    // should test in client section
    // expect(response.text).toInclude('header-transparent');
  });

  test('404-Spa Web app test', async () => {
    const response = await request(app).get('/404').set('host', `igor.${external.prodHostName}`);
    expect(response.statusCode).toBe(404);
    expect(response.text).toInclude(`id="${sid.ridSpa}"`);
    // should test in client section
    // expect(response.text).not.toInclude('header-transparent');
  });

  test('Web app test routes', async () => {
    const tarr = [];
    Object.keys(internal).forEach((url) => {
      tarr.push(request(app).get(internal[url]).set('host', `igor.${external.prodHostName}`));
    });
    await expect(Promise.all(tarr).then((values) => {
      values.forEach((response) => {
        expect(response.statusCode).toBeOneOf([200, 302]);
        expect(response.text).toMatch(new RegExp(`id="${sid.ridSpa}"|Redirecting`));
      });
    })).toResolve();
  });
});
