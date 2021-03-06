/**
 *
 * RAM Memory
 *
 * Copyright (c) 2011-2012, 2016-2017 Reginaldo Silva (reginaldo@ubercomp.com)
 *
 *
 * This Javascript code is free software; you can redistribute it
 * and/or modify it under the terms of the GNU Lesser General Public
 * License, version 2.1, as published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this code; if not, see
 * <http://www.gnu.org/licenses/lgpl-2.1.html>
 */

"use strict";
/**
 *
 * @param size the memory size in bytes
 */
lm32.ram = function(size) {
    var buff = new ArrayBuffer(size);
    var v8 = new Uint8Array(buff);
    var v16 = new Uint16Array(buff);
    var v32 = new Uint32Array(buff);

    var read_8 = function(offset) {
        return v8[offset];
    };

    var read_16 = function(offset) {
        var hi = v8[offset];
        var lo = v8[offset + 1];
        return (hi<<8)|lo
    };

    var read_32 = function(offset) {
        var h0 = v8[offset];
        var h1 = v8[offset + 1];
        var l0 = v8[offset + 2];
        var l1 = v8[offset + 3];
        return (h0<<24)|(h1<<16)|(l0<<8)|(l1);
    };

    var write_8 = function(offset, value) {
    v8[offset] = value;
    };

    var write_16 = function(offset, value) {
        var hi = (value & 0xff00) >> 8;
        var lo = (value & 0xff);
        v8[offset] = hi;
        v8[offset + 1] = lo;
    };

    var write_32 = function(offset, value) {
        var h0 = (value & 0xff000000) >>> 24;
        var h1 = (value & 0x00ff0000) >> 16;
        var l0 = (value & 0x0000ff00) >> 8;
        var l1 = (value & 0x000000ff);
        v8[offset] = h0;
        v8[offset + 1] = h1;
        v8[offset + 2] = l0;
        v8[offset + 3] = l1;
    };

    var get_mmio_handlers = function() {
        var handlers = {
            read_8  : read_8,
            read_16 : read_16,
            read_32 : read_32,
            write_8 : write_8,
            write_16: write_16,
            write_32: write_32
        };
        return handlers;
    };

    return {
        v8: v8,
        v16: v16,
        v32: v32,
        read_8: read_8,
        read_16: read_16,
        read_32: read_32,
        write_8: write_8,
        write_16: write_16,
        write_32: write_32,
        get_mmio_handlers: get_mmio_handlers
    }
}
