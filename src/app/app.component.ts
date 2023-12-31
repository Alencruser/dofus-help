import { Component } from '@angular/core';

type ItemInfos = [
  {key: "itemName", value: string, label: "Nom de l'item", type: "string"},
  {key: "estimatedRecipe", value: string, label: "Prix de la recette estimee", type: "number"},
  {key: "recipeNumber", value: string, label: "Nombre de recettes", type: "number"},
  {key: "kamasBefore", value: string, label: "Kamas avant achat", type: "number"},
  {key: "kamasAfter", value: string, label: "Kamas apres achat", type: "number"},
  {key: "kamasInvested", value: string, label: "Kamas investis", type: "number"},
  {key: "recipeRealPrice", value: string, label:"Prix reel unitaire", type: "number"},
  {key: "destrucCoeff", value: string, label: "Coefficient de brisage", type: "number"},
  {key: "estimatedRunesValue", value: string, label: "Valeur des runes obtenues estimee", type: "number"},
  {key: "benefPercentile", value: string, label: "Benefice en pourcentage", type: "percentile"},
  {key: "comment", value: string, label: "Commentaire additionnel", type: "string"},
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dofus-help';
  list: ItemInfos[] = [];


  constructor() {

  }

  public addItem() {
    this.list.push([
      {key: "itemName", value:"", label: "Nom de l'item", type: "string"},
      {key:"estimatedRecipe", value: "0", label: "Prix de la recette estimee", type: "number"},
      {key: "recipeNumber", value: "0", label: "Nombre de recettes", type: "number"},
      {key: "kamasBefore", value: "0", label: "Kamas avant achat", type: "number"},
      {key: "kamasAfter", value: "0", label: "Kamas apres achat", type: "number"},
      {key: "kamasInvested", value: "0", label: "Kamas investis", type: "number"},
      {key: "recipeRealPrice", value: "0", label: "Prix reel unitaire", type: "number"},
      {key: "destrucCoeff", value: "0", label: "Coefficient de brisage", type: "number"},
      {key: "estimatedRunesValue", value: "0", label: "Valeur des runes obtenues estimee", type: "number"},
      {key: "benefPercentile", value: "", label: "Benefice en pourcentage", type: "percentile"},
      {key: "comment", value: "", label:"Commentaire additionnel", type: "string"},
    ]);
  }

  public removeItem(idx:number) {
    this.list.splice(idx,1);
  }

  public resetEveryItems() {
    this.list = []
  }

  public formattedValue(value:string|number, type: "number" | "string" | "percentile" = "number") {
    const stringValue = String(value);
    const returnValueByType = {
      number: Number(stringValue.replace(/\D/g, "")).toLocaleString(),
      string: String(value),
      percentile: String(value).replace(/[%]/g, "") + "%"
    }

    return returnValueByType[type]
  }

  public getBenefColor(value:string) {
    const valueInNumber = Number(value.replace(/[%]/g, ""))
    return valueInNumber < -10 ? ["red"] : valueInNumber < 11 ? ["orange"] :[ "green"]
  }


  public changeValueForMyProperty(listIdx: number, itemInfosIdx: number, event:Event) {
    setTimeout(()=> {
      if(this.list[listIdx][itemInfosIdx]) {
        this.list[listIdx][itemInfosIdx].value = this.formattedValue((event.target as HTMLInputElement).value, this.list[listIdx][itemInfosIdx].type)
      }

      if(["kamasBefore", "kamasAfter", "recipeNumber", "kamasInvest", "estimatedRunesValue"].includes(this.list[listIdx][itemInfosIdx].key)){
        const recipeRealPriceIdx = this.list[listIdx].findIndex(object=> object.key === "recipeRealPrice");
        const kamasInvestedIdx = this.list[listIdx].findIndex(obj=> obj.key === "kamasInvested");
        const benefIdx = this.list[listIdx].findIndex(obj=> obj.key === "benefPercentile");
        const numberRecipe = Number(this.list[listIdx].find(obj=> obj.key === "recipeNumber")?.value.replace(/\D/g, "") || 0);
        const kamasBefore = Number(this.list[listIdx].find(obj=> obj.key === "kamasBefore")?.value.replace(/\D/g, "") || 0);
        const kamasAfter = Number(this.list[listIdx].find(obj=> obj.key === "kamasAfter")?.value.replace(/\D/g, "") || 0);
        const runesValue = Number(this.list[listIdx].find(obj=> obj.key === "estimatedRunesValue")?.value.replace(/\D/g, "") || 0);
        this.list[listIdx][recipeRealPriceIdx].value = this.formattedValue(Math.round((kamasBefore - kamasAfter)/ numberRecipe), "number")
        this.list[listIdx][kamasInvestedIdx].value = this.formattedValue(kamasBefore - kamasAfter, "number");
        this.list[listIdx][benefIdx].value = this.formattedValue((runesValue - (kamasBefore - kamasAfter))*100/(kamasBefore - kamasAfter), "percentile");
      }
    })
  }


}
