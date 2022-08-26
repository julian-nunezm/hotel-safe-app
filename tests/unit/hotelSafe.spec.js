import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import HotelSafe from "../../src/components/HotelSafe.vue";

test("render keyboard", () => {
  const wrapper = mount(HotelSafe, {
    global: {
      plugins: [createPinia()],
    },
  });

  const todo = wrapper.get('[data-test="button"]');
  expect(todo.text()).toBe("1");
  expect(wrapper.findAll('[data-test="button"]')).toHaveLength(12);

  const allButtons = wrapper.findAll('[data-test="button"]');
  const enterKey = allButtons.filter((text) => text.text() === "=>");
  //console.log(enterKey.length);
  enterKey[0].trigger("click");
  //expect(enterKey[0].text().toBe("=>"))

  //wrapper.get('[data-test="button"]').trigger('click')
  const display = wrapper.get('[data-test="display"]');
  //console.log(display.text());
  expect(display.text()).toBe('')
  //const display2 = wrapper.find('label').first().text()
  //expect(display2).to.equal('test');
});
