import { mount } from '@vue/test-utils'
import DiaLog from '../packages/dialog/src/main.vue';

describe('DiaLog', () => {
  it('DiaLog 组件 中的 props 属性',  async () => {
    const wrapper = mount(DiaLog, {
      propsData: {
        value: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.props().value).toBe(true)
  })
})