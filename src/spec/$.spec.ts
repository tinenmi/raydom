import { $ } from "../lib/$"
import { Tracker } from '../lib/aux/Tracker';

jest.mock('../lib/aux/Tracker');

afterEach(() => {
  jest.clearAllMocks();
});

describe('$', () => {
  it('$ is a callable object that returns its own state', () => {
    let $value = $.new(1)
    let value = $value()
    expect(value).toBe(1)
  })

  it('$ implements Ray interface', () => {
    let $value: Ray<number> = $.new(1)
    expect(true).toBe(true)
  })

  it('$ allows to set a new value', () => {
    let $value = $.new(1)
    $value(2)
    let value = $value()
    expect(value).toBe(2)
  })

  it('$ can accept falsely values', () => {
    let $value = $.new('1')
    $value('')
    let value = $value()
    expect(value).toBe('')
  })

  it('when reading $ prompts the tracker to monitor its state', () => {
    let $value = $.new(1)
    let value = $value()
    expect(Tracker.tease).toHaveBeenCalledTimes(1)
  })
})
