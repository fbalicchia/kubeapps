import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import I18n, { II18nConfig } from "shared/I18n";
import Root from "./Root";

it("renders the root componet", () => {
  const wrapper = shallow(<Root />);
  expect(wrapper).toExist();
});

it("loads the initial i18n config from getDefaulI18nConfig", async () => {
  const config: II18nConfig = { locale: "custom", messages: { messageId: "translation" } };
  const getDefaultConfig = jest.spyOn(I18n, "getDefaultConfig").mockReturnValue(config);
  act(() => {
    shallow(<Root />);
  });
  expect(getDefaultConfig).toHaveBeenCalled();
});

it("loads the async i18n config from getCustomI18nConfig", async () => {
  const config: II18nConfig = { locale: "custom", messages: { messageId: "translation" } };
  I18n.getCustomConfig = jest.fn().mockReturnValue({ then: jest.fn((f: any) => f(config)) });
  act(() => {
    const wrapper = shallow(<Root />);
    expect(wrapper.find(IntlProvider).prop("locale")).toBe("custom");
    expect(wrapper.find(IntlProvider).prop("messages")).toStrictEqual({ messageId: "translation" });
  });
});
