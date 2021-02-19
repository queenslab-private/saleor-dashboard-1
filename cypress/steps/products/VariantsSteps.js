import { PRODUCTS_SELECTORS } from "../../elements/catalog/product-selectors";
import { VARIANTS_SELECTORS } from "../../elements/catalog/variants-selectors";
class VariantsSteps {
  createFirstVariant(sku, warehouseId, price) {
    cy.get(PRODUCTS_SELECTORS.addVariantsButton)
      .click()
      .get(VARIANTS_SELECTORS.attributeCheckbox)
      .first()
      .click()
      .get(VARIANTS_SELECTORS.nextButton)
      .click()
      .get(VARIANTS_SELECTORS.priceInput)
      .forEach(priceInput => cy.priceInput.type(price));
    cy.get(`[name*='${warehouseId}']`)
      .click()
      .get(VARIANTS_SELECTORS.nextButton)
      .click()
      .get(VARIANTS_SELECTORS.skuInput)
      .type(sku);
    cy.waitForGraph("ProductVariantBulkCreate");
    cy.get(VARIANTS_SELECTORS.nextButton).click();
    cy.wait("@ProductVariantBulkCreate");
  }
  createVariant(sku, warehouseName, price, costPrice = price) {
    cy.get(PRODUCTS_SELECTORS.addVariantsButton)
      .click()
      .get(VARIANTS_SELECTORS.attributeSelector)
      .click()
      .get(VARIANTS_SELECTORS.attributeOption)
      .first()
      .click()
      .get(VARIANTS_SELECTORS.priceInput)
      .type(price)
      .get(VARIANTS_SELECTORS.costPriceInput)
      .type(costPrice)
      .get(VARIANTS_SELECTORS.skuInputInAddVariant)
      .type(sku)
      .get(VARIANTS_SELECTORS.addWarehouseButton)
      .click();
    cy.contains(VARIANTS_SELECTORS.warehouseOption, warehouseName).click();
    cy.waitForGraph("VariantCreate");
    cy.get(VARIANTS_SELECTORS.saveButton).click();
    cy.wait("@VariantCreate");
  }
}
export default VariantsSteps;