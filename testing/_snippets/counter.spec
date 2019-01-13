import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
    expect(wrapper.vm.counter).toBe(0);
  });

  it("increase when click", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.vm.counter).toBe(1);
    expect(wrapper.find("button").classes("positive")).toBeTruthy();
  });

  it("decrease when right-click", () => {
    wrapper.find("button").trigger("contextmenu");
    expect(wrapper.vm.counter).toBe(-1);
    expect(wrapper.find("button").classes("negative")).toBeTruthy();
  });
});
