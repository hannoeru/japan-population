import { describe, expect, it } from 'vitest'
import { createPage, setup } from '@nuxt/test-utils/e2e'
import type { ChartData } from 'chart.js'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('index page e2e', async () => {
  await setup({
    // Require Nuxt dev server to be running
    host: 'http://localhost:3000',
    browser: true,
  })

  let chartData: ChartData<'line'> | undefined

  type Page = Awaited<ReturnType<typeof createPage>>

  async function refreshChartData(page: Page) {
    chartData = await page.evaluate<ChartData<'line'>>(() => {
      // @ts-expect-error missing types
      const chart = document.querySelector('canvas')?.__vnode.ctx.ctx
      return chart.data
    })
  }

  async function clickPrefecture(page: Page, prefName: string) {
    const res = page.waitForResponse('**/api/populations**')
    await page.getByRole('checkbox', { name: prefName }).click()
    await res
    await refreshChartData(page)
  }

  it('should display the page correctly', async () => {
    const page = await createPage('/')
    expect(await page.textContent('h1')).toBe(' 都道府県別人口推移グラフ ')
    expect((await page.getByRole('checkbox').all()).length).toBe(47)
    expect(page.getByText('選択項目をクリア')).not.toBeNull()
    expect(await page.textContent('h2')).toBe(' 人口推移グラフ ')
  })

  it('should display chart base on selected prefectures', async () => {
    const page = await createPage('/')
    /**
     * select 北海道
     */
    await clickPrefecture(page, '北海道')

    expect(chartData?.datasets[0]?.label).toBe('北海道')
    expect(chartData?.datasets[0]?.data.length).toBeGreaterThan(0)

    /**
     * select 東京都
     */
    await clickPrefecture(page, '東京都')

    expect(chartData?.datasets.length).toBe(2)
    expect(chartData?.datasets[1]?.label).toBe('東京都')
    expect(chartData?.datasets[1]?.data.length).toBeGreaterThan(0)

    /**
     * unselect 北海道
     */
    await clickPrefecture(page, '北海道')

    expect(chartData?.datasets.length).toBe(1)
    expect(chartData?.datasets[0]?.label).toBe('東京都')
    expect(chartData?.datasets[0]?.data.length).toBeGreaterThan(0)
  })

  it.each([
    ['年少人口'],
    ['生産年齢人口'],
    ['老年人口'],
  ])(`should switch population data to %s`, async (type) => {
    const page = await createPage('/')
    await clickPrefecture(page, '東京都')

    await page.getByRole('button', { name: type }).click()

    const prevData = chartData
    await refreshChartData(page)

    expect(chartData?.datasets[0]?.label).toEqual(prevData?.datasets[0]?.label)
    expect(chartData?.datasets[0]?.data).not.toEqual(prevData?.datasets[0]?.data)
  })

  it('should clear all selected prefectures', async () => {
    const page = await createPage('/')
    await clickPrefecture(page, '東京都')
    await page.getByRole('button', { name: '選択項目をクリア' }).click()

    //  都道府県を選択してください が表示される
    expect(page.getByText('都道府県を選択してください')).not.toBeNull()
  })

  it('check all prefectures', async () => {
    const page = await createPage('/')
    // click all checkboxes
    for (const checkbox of await page.getByRole('checkbox').all()) {
      await checkbox.click()
    }

    // await debounce time
    await wait(120)

    await refreshChartData(page)

    expect(chartData?.datasets.length).toBe(47)
  })
})
