"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleAlert = void 0;
class SingleAlert {
    constructor(data) {
        this.data = data;
    }
    getId() { return this.data.id; }
    getSeverity() { return this.data.severity; }
    getTimestamp() { return this.data.timestamp; }
    getData() { return this.data; }
    getChildren() { return []; }
    add(_) { throw new Error('Leaf node'); }
    remove(_) { throw new Error('Leaf node'); }
    isLeaf() { return true; }
}
exports.SingleAlert = SingleAlert;
//# sourceMappingURL=single-alert.js.map