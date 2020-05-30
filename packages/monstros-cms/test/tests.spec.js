import { monstrosCms } from '../src'

describe('tests', () => {
	test('test', () => {
		expect(monstrosCms('parameter')).toEqual('output "parameter"')
	})
})
