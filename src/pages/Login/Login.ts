import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import SignIn from './Login.vue'

test('component displayed', async () => {
  const { getByTestId } = render(SignIn)

  expect(getByTestId('app')).toBeInTheDocument()
})
