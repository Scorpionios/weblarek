import { categoryMap } from "../../utils/constants";

type CategoryKey = keyof typeof categoryMap;

export function colorCategory (item: HTMLElement) {
    for (let key in categoryMap) {
        item.classList.toggle(
            categoryMap[key as CategoryKey],
            key == item.textContent
        );
    }
}