async loadData() { const config = { headers: { Authorization: `Bearer
${localStorage.getItem("accessToken")}`, "Access-Control-Allow-Origin": "*", },
}; this.partners = await loadData(this.listData, config); },
