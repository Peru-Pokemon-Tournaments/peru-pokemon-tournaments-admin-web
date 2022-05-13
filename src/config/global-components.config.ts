import { App } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import BaseButton from "../components/ui/BaseButton.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BaseFileInput from "../components/ui/BaseFileInput.vue";
import BaseSelect from "../components/ui/BaseSelect.vue";
import BaseOption from "../components/ui/BaseOption.vue";
import BaseTable from "../components/ui/BaseTable.vue";
import BaseCell from "../components/ui/BaseCell.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import BaseIcon from "../components/ui/BaseIcon.vue";
import BaseModal from "../components/ui/BaseModal.vue";
import BasePopover from "../components/ui/BasePopover.vue";
import BaseSimpleList from "../components/ui/BaseSimpleList.vue";
import BasePagination from "../components/ui/BasePagination.vue";
import BaseTableActions from "../components/ui/BaseTableActions.vue";
import BaseBadge from "../components/ui/BaseBadge.vue";
import BaseTextarea from "../components/ui/BaseTextarea.vue";
import BaseChip from "../components/ui/BaseChip.vue";
import BaseEmptyMessage from "../components/ui/BaseEmptyMessage.vue";

const addComponents = (app: App): void => {
  app.component("font-awesome-icon", FontAwesomeIcon);

  app.component("base-button", BaseButton);
  app.component("base-input", BaseInput);
  app.component("base-file-input", BaseFileInput);
  app.component("base-select", BaseSelect);
  app.component("base-option", BaseOption);
  app.component("base-table", BaseTable);
  app.component("base-cell", BaseCell);
  app.component("base-card", BaseCard);
  app.component("base-icon", BaseIcon);
  app.component("base-modal", BaseModal);
  app.component("base-popover", BasePopover);
  app.component("base-simple-list", BaseSimpleList);
  app.component("base-pagination", BasePagination);
  app.component("base-table-actions", BaseTableActions);
  app.component("base-badge", BaseBadge);
  app.component("base-textarea", BaseTextarea);
  app.component("base-chip", BaseChip);
  app.component("base-empty-message", BaseEmptyMessage);
};

export { addComponents };
